import { writeFile } from "node:fs/promises";
import path from "node:path";
import { showToast, Toast, AI } from "@raycast/api";
import { Card, EXPORT_DIR } from "./types";

export const updateCard = (cards: Card[], index: number, updates: Partial<Card>) =>
  cards.map((card, i) => (i === index ? { ...card, ...updates } : card));

export const getCardDetailMarkdown = (card: Card) => {
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

export const exportToCSV = async (cards: Card[]) => {
  const time = new Date().toISOString();
  const filePath = path.join(EXPORT_DIR, `anki_card_review_${time}.csv`);
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

const JSON_REPAIR_PROMPT = `
Fix the following AI response into valid JSON that matches this structure:
{"data": [{"question": string, "answer": string}]}

AI Response to fix:
`;

export const parseAIResponse = async (aiResponse: string, setStatusMessage: (msg: string) => void) => {
  try {
    const parsed = JSON.parse(aiResponse);
    const cards = parsed.data;

    if (!Array.isArray(cards)) {
      throw new Error("Invalid cards array structure");
    }

    return cards.map((card: { question: string; answer: string }) => ({
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
        model: AI.Model.Anthropic_Claude_Haiku,
        creativity: 0,
      });

      setStatusMessage("Repair attempt completed, parsing result...");

      const repaired = JSON.parse(repairedJson);
      return repaired.data.map((card: { question: string; answer: string }) => ({
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
