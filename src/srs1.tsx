import {
  ActionPanel,
  List,
  Action,
  Icon,
  showToast,
  Toast,
  Form,
  getPreferenceValues,
  environment,
  useNavigation,
  BrowserExtension,
  Clipboard,
  getSelectedText,
  AI,
} from "@raycast/api";
import { useAI } from "@raycast/utils";
import { runAppleScript } from "@raycast/utils";
import { useState, useCallback, useEffect } from "react";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import srsRules from "./prompt";

const exportDir = "/Users/alien/Downloads";

const JSON_REPAIR_PROMPT = `
Fix the following AI response into valid JSON that matches this structure:
{"data": [{"question": string, "answer": string, "options": {"A": string, "B": string, "C": string}}]}

AI Response to fix:
`;

interface Card {
  question: string;
  answer: string;
  isSelected: boolean;
  isAnswerRevealed: boolean;
  choices: { A: boolean; B: boolean; C: boolean };
  comment: string;
  options: {
    A: string;
    B: string;
    C: string;
  };
}

// Card Utilities
const updateCard = (cards: Card[], index: number, updates: Partial<Card>) =>
  cards.map((card, i) => (i === index ? { ...card, ...updates } : card));

const getCardDetailMarkdown = (card: Card) => {
  const sections = [];

  if (card.isAnswerRevealed) {
    sections.push(
      "\n## Feedback",
      ...Object.entries(card.options).map(
        ([key, value], index) => `- [${card.choices[key] ? "x" : " "}] ${index + 1}. ${value}`,
      ),
      "\n## Freeform Comment",
      card.comment ? card.comment : "*Press 4 to add comment*",
    );
  } else {
    sections.push("\n*Press Space to reveal answer*");
  }

  return sections.join("\n");
};

const getFeedbackString = (card: Card) => {
  const selectedChoices = Object.entries(card.choices)
    .filter(([_, selected]) => selected)
    .map(([key]) => card.options[key])
    .join(". ");

  return [selectedChoices, card.comment].filter(Boolean).join(". ");
};

// CSV Export
const exportToCSV = async (cards: Card[]) => {
  const filePath = path.join(exportDir, "anki_card_review.csv");
  const timestamp = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const csvContent = [
    ["Selected", "Question", "Answer", "Feedback", "Timestamp"],
    ...cards.map((card) => [
      card.isSelected ? "1" : "0",
      `"${card.question.replace(/"/g, '""')}"`,
      `"${card.answer.replace(/"/g, '""').replace(/\n/g, "\\n")}"`,
      `"${getFeedbackString(card).replace(/"/g, '""')}"`,
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
      isSelected: false,
      isAnswerRevealed: false,
      choices: { A: false, B: false, C: false },
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
        isSelected: false,
        isAnswerRevealed: false,
        choices: { A: false, B: false, C: false },
        comment: "",
      }));
    } catch (repairError) {
      console.error("Repair attempt failed:", repairError);
      setStatusMessage("Both parsing attempts failed. Please try again.");
      return [];
    }
  }
};

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

  const handleToggleSelect = useCallback(
    (index: number, isSelected: boolean) => {
      handleUpdateCard(index, { isSelected: !isSelected });
    },
    [handleUpdateCard],
  );

  const handleChoiceSelect = useCallback(
    (index: number, choices: Record<string, boolean>, choice: string) => {
      handleUpdateCard(index, {
        choices: { ...choices, [choice]: !choices[choice] },
      });
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
            Create *four* (4) SRS anki flashcards from the material given the guidelines. 
            Your answer most be fully parse-able JSON containting the question, answer and possbile critiques the user can chose from for the card,
             ie. {"data": [{"question": "first card front", "answer": "card back", "options": {"A": "too ambigous", "B": "useless trivia without ...", "C":"the content is ... "}, {"question": "...", ....}]}.

            One card has the structure:
             interface Card {
    question: string;
    answer: string;
      options: {
      A: string;
      B: string;
      C: string;
    };
    }

          Your response will be pasted into an UI after running through JSON.parse! No preamble, just valid JSON.
           
          <material>
          ${selectedText}
          </material>
          ----
          
          ${srsRules}
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
            <ActionPanel.Item
              title={card.isSelected ? "Deselect Card" : "Select Card"}
              icon={card.isSelected ? Icon.CheckCircle : Icon.Circle}
              onAction={() => handleToggleSelect(index, card.isSelected)}
              shortcut={{ modifiers: [], key: "space" }}
            />

            {Object.entries(card.options).map(([choice, text], idx) => (
              <ActionPanel.Item
                key={choice}
                title={`${idx + 1}. ${text}`}
                icon={card.choices[choice] ? Icon.CheckCircle : Icon.Circle}
                onAction={() => handleChoiceSelect(index, card.choices, choice)}
                shortcut={{ modifiers: [], key: String(idx + 1) }}
              />
            ))}

            <ActionPanel.Item
              title="Add/Edit Comment"
              icon={Icon.Text}
              shortcut={{ modifiers: [], key: "4" }}
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

  if (isLoading) {
    return (
      <List isLoading={true}>
        <List.EmptyView title="Generating Cards" description={statusMessage} icon={Icon.Clock} />
      </List>
    );
  }

  return (
    <List isShowingDetail>
      {cards.map((card, index) => (
        <List.Item
          key={index}
          title={card.question}
          icon={card.isSelected ? Icon.CheckCircle : Icon.Circle}
          detail={<List.Item.Detail markdown={getCardDetailMarkdown(card)} />}
          actions={renderActions(card, index)}
        />
      ))}
    </List>
  );
}
