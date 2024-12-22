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
} from "@raycast/api";
import { useState, useCallback } from "react";
import { writeFile } from "fs/promises";
import path from "path";

const exportDir = "/Users/alien/Downloads";

const INITIAL_CARDS = [
  {
    question: "What is the capital of France?",
    answer: "Paris is the capital of France 🗼",
    isSelected: false,
    isAnswerRevealed: false,
    choices: { A: false, B: false, C: false },
    comment: "",
    options: {
      A: "London",
      B: "Paris",
      C: "Berlin",
    },
  },
  {
    question: "Naehhh?",
    answer: "Tessr",
    isSelected: false,
    isAnswerRevealed: false,
    choices: { A: false, B: false, C: false },
    comment: "",
    options: {
      A: "weae",
      B: "asds",
      C: "werqwr",
    },
  },
];

// Card Utilities
const updateCard = (cards, index, updates) => cards.map((card, i) => (i === index ? { ...card, ...updates } : card));

const getCardDetailMarkdown = (card) => {
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

const getFeedbackString = (card) => {
  const selectedChoices = Object.entries(card.choices)
    .filter(([_, selected]) => selected)
    .map(([key]) => card.options[key])
    .join(". ");

  return [selectedChoices, card.comment].filter(Boolean).join(". ");
};

// CSV Export
const exportToCSV = async (cards) => {
  const filePath = path.join(exportDir, "anki_card_review.csv");
  const csvContent = [
    ["Selected", "Question", "Answer", "Feedback"],
    ...cards.map((card) => [
      card.isSelected ? "1" : "0",
      `"${card.question.replace(/"/g, '""')}"`,
      `"${card.answer.replace(/"/g, '""').replace(/\n/g, "\\n")}"`,
      `"${getFeedbackString(card).replace(/"/g, '""')}"`,
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
const CommentForm = ({ initialComment, onSubmit }) => {
  const { pop } = useNavigation();

  const handleSubmit = useCallback(
    (values) => {
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

// Main Command Component
export default function Command() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const { push } = useNavigation();
  const preferences = getPreferenceValues();

  const handleUpdateCard = useCallback((index, updates) => {
    setCards((prevCards) => updateCard(prevCards, index, updates));
  }, []);

  const handleExportToCSV = useCallback(() => exportToCSV(cards), [cards]);

  const renderActions = (card, index) => {
    const handleToggleAnswer = useCallback(
      () => handleUpdateCard(index, { isAnswerRevealed: !card.isAnswerRevealed }),
      [index, card.isAnswerRevealed, handleUpdateCard],
    );

    const handleToggleSelect = useCallback(
      () => handleUpdateCard(index, { isSelected: !card.isSelected }),
      [index, card.isSelected, handleUpdateCard],
    );

    const handleChoiceSelect = useCallback(
      (choice) =>
        handleUpdateCard(index, {
          choices: { ...card.choices, [choice]: !card.choices[choice] },
        }),
      [index, card.choices, handleUpdateCard],
    );

    const handleAddComment = useCallback(
      () =>
        push(
          <CommentForm
            initialComment={card.comment}
            onSubmit={(newComment) => handleUpdateCard(index, { comment: newComment })}
          />,
        ),
      [index, card.comment, handleUpdateCard, push],
    );

    return (
      <ActionPanel>
        {!card.isAnswerRevealed && (
          <ActionPanel.Item
            title="Show Answer"
            icon={Icon.Eye}
            onAction={handleToggleAnswer}
            shortcut={{ modifiers: [], key: "space" }}
          />
        )}
        {card.isAnswerRevealed && (
          <>
            <ActionPanel.Section>
              <ActionPanel.Item
                title={card.isSelected ? "Deselect Card" : "Select Card"}
                icon={card.isSelected ? Icon.CheckCircle : Icon.Circle}
                onAction={handleToggleSelect}
                shortcut={{ modifiers: [], key: "space" }}
              />

              {Object.entries(card.options).map(([choice, text], idx) => (
                <ActionPanel.Item
                  key={choice}
                  title={`${idx + 1}. ${text}`}
                  icon={card.choices[choice] ? Icon.CheckCircle : Icon.Circle}
                  onAction={() => handleChoiceSelect(choice)}
                  shortcut={{ modifiers: [], key: String(idx + 1) }}
                />
              ))}

              <ActionPanel.Item
                title="Add/Edit Comment"
                icon={Icon.Text}
                shortcut={{ modifiers: [], key: "4" }}
                onAction={handleAddComment}
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
  };

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
