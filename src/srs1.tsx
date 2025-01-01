import {
  ActionPanel,
  List,
  Action,
  Icon,
  showToast,
  Toast,
  Form,
  useNavigation,
  getSelectedText,
  AI,
} from "@raycast/api";
import { useState, useCallback, useEffect } from "react";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import srsPrompt from "./prompt";

const exportDir = "/Users/alien/Downloads";

const JSON_REPAIR_PROMPT = `
Fix the following AI response into valid JSON that matches this structure:
{"data": [{"question": string, "answer": string}]}

AI Response to fix:
`;

interface Card {
  question: string;
  answer: string;
  isAnswerRevealed: boolean;
  rating: number | null;
  comment: string;
  options?: Record<string, string>;
}

// Card Utilities
const updateCard = (cards: Card[], index: number, updates: Partial<Card>) =>
  cards.map((card, i) => (i === index ? { ...card, ...updates } : card));

const getCardDetailMarkdown = (card: Card) => {
  const sections = [
    "## Question",
    card.question,
    "\n## Answer",
    card.isAnswerRevealed ? card.answer : "*Press Space to reveal answer*",
  ];

  if (card.isAnswerRevealed) {
    sections.push(
      "\n## Rating",
      card.rating ? `Rating: ${card.rating}/4` : "*Press 1-4 to rate*",
      "\n## Comment",
      card.comment ? card.comment : "*Press C to add comment*",
    );
  }

  return sections.join("\n");
};

// CSV Export
const exportToCSV = async (cards: Card[]) => {
  const time = new Date().toISOString();
  const filePath = path.join(exportDir, `anki_card_review_${time}.csv`);
  const timestamp = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const csvContent = [
    ["Rating", "Question", "Answer", "Comment", "Timestamp"],
    ...cards.map((card) => [
      card.rating?.toString() || "",
      `"${card.question.replace(/"/g, '""')}"`,
      `"${card.answer.replace(/"/g, '""').replace(/\n/g, "\\n")}"`,
      `"${card.comment?.replace(/"/g, '""') || ""}"`,
      `"${timestamp}"`,
    ]),
  ].join("\n");

  try {
    await writeFile(filePath, csvContent, "utf-8");
    await showToast({
      style: Toast.Style.Success,
      title: "Exported Successfully",
      message: `Saved to ${path.basename(filePath)}`,
    });
  } catch (error) {
    console.error("Export error:", error);
    await showToast({
      style: Toast.Style.Failure,
      title: "Export Failed",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

// Comment Form Component
const CommentForm = ({ initialComment, onSubmit }: { initialComment: string; onSubmit: (comment: string) => void }) => {
  const { pop } = useNavigation();

  const handleSubmit = useCallback(
    (values: { comment: string }) => {
      onSubmit(values.comment);
      pop();
      showToast({ style: Toast.Style.Success, title: "Comment saved" });
    },
    [onSubmit, pop],
  );

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save Comment" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="comment"
        title="Comment"
        placeholder="Enter your feedback here..."
        defaultValue={initialComment}
      />
    </Form>
  );
};

const parseAIResponse = async (aiResponse: string, setStatusMessage: (msg: string) => void) => {
  try {
    const parsed = JSON.parse(aiResponse);
    const cards = parsed.data;

    if (!Array.isArray(cards)) {
      throw new Error("Invalid cards array structure");
    }

    return cards.map((card) => ({
      ...card,
      isAnswerRevealed: false,
      rating: null,
      comment: "",
    }));
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    setStatusMessage("Initial parse failed, attempting repair with GPT-4...");

    try {
      const repairPrompt = `${JSON_REPAIR_PROMPT}${aiResponse}`;
      const repairedJson = await AI.ask(repairPrompt, {
        model: AI.Model.GPT4,
        creativity: 0,
      });

      setStatusMessage("Repair attempt completed, parsing result...");

      const repaired = JSON.parse(repairedJson);
      return repaired.data.map((card) => ({
        ...card,
        isAnswerRevealed: false,
        rating: null,
        comment: "",
      }));
    } catch (repairError) {
      console.error("Repair attempt failed:", repairError);
      setStatusMessage("Both parsing attempts failed. Please try again.");
      return [];
    }
  }
};

// Add rating descriptions to make the UI more helpful
const RATING_DESCRIPTIONS = {
  1: "Again - Complete blackout",
  2: "Hard - Significant effort to recall",
  3: "Good - Some effort to recall",
  4: "Easy - Perfect recall",
} as const;

export default function Command() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Initializing...");
  const { push } = useNavigation();

  const handleUpdateCard = useCallback((index: number, updates: Partial<Card>) => {
    setCards((prevCards) => updateCard(prevCards, index, updates));
  }, []);

  const handleExportToCSV = useCallback(() => exportToCSV(cards), [cards]);

  const handleToggleAnswer = useCallback(
    (index: number, isAnswerRevealed: boolean) => {
      handleUpdateCard(index, { isAnswerRevealed: !isAnswerRevealed });
    },
    [handleUpdateCard],
  );

  const handleRating = useCallback(
    (index: number, rating: number) => {
      handleUpdateCard(index, { rating });
    },
    [handleUpdateCard],
  );

  const handleAddComment = useCallback(
    (index: number, comment: string) => {
      push(
        <CommentForm
          initialComment={comment}
          onSubmit={(newComment) => handleUpdateCard(index, { comment: newComment })}
        />,
      );
    },
    [handleUpdateCard, push],
  );

  useEffect(() => {
    async function initializeCards() {
      try {
        setStatusMessage("Getting selected text...");
        const selectedText = await getSelectedText();

        setStatusMessage("Generating cards with Claude...");
        const prompt = `
  Create *four* (4) SRS anki flashcards from the material. 
  Return valid JSON matching this structure:
  {"data": [{"question": "card front", "answer": "card back"}]}

  No preamble or explanation, just the JSON.
         
  <material>
  ${selectedText}
  </material>
  ----
  
  ${srsPrompt}
`;

        const aiResponse = await AI.ask(prompt, {
          model: AI.Model.Anthropic_Claude_Sonnet,
          creativity: 1,
        });

        setStatusMessage("Processing AI response...");
        const parsedCards = await parseAIResponse(aiResponse, setStatusMessage);
        setCards(parsedCards);
      } catch (error) {
        console.error("Failed to initialize cards:", error);
        setStatusMessage("Error: Failed to generate cards");
        await showToast({
          style: Toast.Style.Failure,
          title: "Failed to generate cards",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        setIsLoading(false);
      }
    }

    initializeCards();
  }, []);

  const renderActions = (card: Card, index: number) => (
    <ActionPanel>
      {!card.isAnswerRevealed && (
        <ActionPanel.Item
          title="Show Answer"
          icon={Icon.Eye}
          onAction={() => handleToggleAnswer(index, card.isAnswerRevealed)}
          shortcut={{ modifiers: [], key: "space" }}
        />
      )}
      {card.isAnswerRevealed && (
        <>
          <ActionPanel.Section>
            {[1, 2, 3, 4].map((rating) => (
              <ActionPanel.Item
                key={rating}
                title={`${rating} - ${RATING_DESCRIPTIONS[rating as keyof typeof RATING_DESCRIPTIONS]}`}
                icon={card.rating === rating ? Icon.StarFilled : Icon.Star}
                onAction={() => handleRating(index, rating)}
                shortcut={{ modifiers: [], key: String(rating) }}
              />
            ))}

            <ActionPanel.Item
              title="Add/Edit Comment"
              icon={Icon.Text}
              shortcut={{ modifiers: [], key: "c" }}
              onAction={() => handleAddComment(index, card.comment)}
            />
          </ActionPanel.Section>

          <ActionPanel.Section>
            <ActionPanel.Item
              title="Export to CSV"
              icon={Icon.Download}
              onAction={handleExportToCSV}
              shortcut={{ modifiers: ["cmd"], key: "s" }}
            />
          </ActionPanel.Section>
        </>
      )}
    </ActionPanel>
  );

  if (isLoading || cards.length === 0) {
    return (
      <List
        isLoading={isLoading}
        navigationTitle="SRS Cards"
        searchBarPlaceholder={isLoading ? "Loading..." : "No cards generated"}
      >
        <List.Item title="">
          <List.EmptyView
            title={isLoading ? "Generating Cards" : "No Cards Available"}
            description={statusMessage}
            icon={isLoading ? Icon.Clock : Icon.ExclamationMark}
          />
        </List.Item>
      </List>
    );
  }

  return (
    <List isShowingDetail navigationTitle="SRS Cards" searchBarPlaceholder="Search cards...">
      {cards.map((card, index) => (
        <List.Item
          key={index}
          icon={card.rating ? Icon.StarFilled : Icon.Star}
          title={card.question}
          detail={<List.Item.Detail markdown={getCardDetailMarkdown(card)} />}
          actions={renderActions(card, index)}
        />
      ))}
    </List>
  );
}
