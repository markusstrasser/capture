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
import { useState } from "react";
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
];

// Separate Form Command for Comments
function CommentForm(props) {
  const { pop } = useNavigation();

  function handleSubmit(values) {
    props.onSubmit(values.comment);
    pop();
    showToast({
      style: Toast.Style.Success,
      title: "Comment saved",
    });
  }

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
        defaultValue={props.initialComment}
      />
    </Form>
  );
}

export default function Command() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const { push } = useNavigation();
  const preferences = getPreferenceValues();

  const updateCard = (index, updates) => {
    setCards(cards.map((card, i) => (i === index ? { ...card, ...updates } : card)));
  };

  function getCardDetailMarkdown(card) {
    const sections = [];

    sections.push(`# ${card.isSelected ? "✅ Selected" : "⭕️ Not Selected"}\n`);
    sections.push(`# Question\n\n${card.question}`);

    if (card.isAnswerRevealed) {
      sections.push(`\n\n# Answer\n\n${card.answer}`);

      sections.push("\n\n## Multiple Choice Options");
      Object.entries(card.options).forEach(([key, value], index) => {
        const isSelected = card.choices[key];
        sections.push(`- [${isSelected ? "x" : " "}] ${index + 1}. ${value}`);
      });

      sections.push("\n\n## Comment");
      sections.push(card.comment ? card.comment : "*Press 4 to add comment*");
    } else {
      sections.push("\n\n*Press Space to reveal answer*");
    }

    return sections.join("\n");
  }

  const getFeedbackString = (card) => {
    const selectedChoices = Object.entries(card.choices)
      .filter(([_, selected]) => selected)
      .map(([key]) => card.options[key])
      .join(". ");

    const parts = [];
    if (selectedChoices) parts.push(selectedChoices);
    if (card.comment) parts.push(card.comment);

    return parts.join(". ");
  };

  const exportToCSV = async () => {
    const exportPath = exportDir;
    const filePath = path.join(exportPath, "anki_card_review.csv");

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

  const renderActions = (card, index) => {
    if (!card.isAnswerRevealed) {
      return (
        <ActionPanel>
          <ActionPanel.Item
            title="Show Answer"
            icon={Icon.Eye}
            onAction={() => updateCard(index, { isAnswerRevealed: true })}
            shortcut={{ modifiers: [], key: "space" }}
          />
        </ActionPanel>
      );
    }

    return (
      <ActionPanel>
        <ActionPanel.Section>
          <ActionPanel.Item
            title={card.isSelected ? "Deselect Card" : "Select Card"}
            icon={card.isSelected ? Icon.CheckCircle : Icon.Circle}
            onAction={() => updateCard(index, { isSelected: !card.isSelected })}
            shortcut={{ modifiers: [], key: "space" }}
          />

          {Object.entries(card.options).map(([choice, text], idx) => (
            <ActionPanel.Item
              key={choice}
              title={`${idx + 1}. ${text}`}
              icon={card.choices[choice] ? Icon.CheckCircle : Icon.Circle}
              onAction={() =>
                updateCard(index, {
                  choices: { ...card.choices, [choice]: !card.choices[choice] },
                })
              }
              shortcut={{ modifiers: [], key: String(idx + 1) }}
            />
          ))}

          <ActionPanel.Item
            title="Add/Edit Comment"
            icon={Icon.Text}
            shortcut={{ modifiers: [], key: "4" }}
            onAction={() => {
              push(
                <CommentForm
                  initialComment={card.comment}
                  onSubmit={(newComment) => updateCard(index, { comment: newComment })}
                />,
              );
            }}
          />
        </ActionPanel.Section>

        <ActionPanel.Section>
          <ActionPanel.Item
            title="Export to CSV"
            icon={Icon.Download}
            onAction={exportToCSV}
            shortcut={{ modifiers: ["cmd"], key: "s" }}
          />
        </ActionPanel.Section>
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
