import type { KeyEquivalent } from "@raycast/api";
import {
  ActionPanel,
  List,
  Action,
  Icon,
  showToast,
  Toast,
  AI,
  closeMainWindow,
  popToRoot,
  LocalStorage,
  getSelectedText,
  environment,
} from "@raycast/api";
import { useState, useCallback, useEffect } from "react";
import { CommentForm } from "./components";
import { Card, STORAGE_KEY } from "./types";
import { updateCard, getCardDetailMarkdown, exportToCSV, parseAIResponse } from "./utils";
import srsPrompt from "./prompt";

export default function Command() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [shouldInitialize, setShouldInitialize] = useState(true);

  // Load cards from storage on mount
  useEffect(() => {
    async function loadCards() {
      try {
        const storedCards = await LocalStorage.getItem<string>(STORAGE_KEY);
        if (storedCards) {
          setCards(JSON.parse(storedCards));
        }
      } catch (error) {
        console.error("Failed to load cards from storage:", error);
      }
    }
    loadCards();
  }, []);

  // Save cards to storage whenever they change
  useEffect(() => {
    async function saveCards() {
      try {
        await LocalStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
      } catch (error) {
        console.error("Failed to save cards to storage:", error);
      }
    }
    saveCards();
  }, [cards]);

  // Update setStatusMessage to show toast
  const updateStatus = useCallback(async (message: string) => {
    setStatusMessage(message);
    await showToast({
      style: Toast.Style.Animated,
      title: "Generating Cards",
      message,
    });
  }, []);

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
      return (
        <ActionPanel>
          <Action.Push
            title="Add Comment"
            target={
              <CommentForm
                initialComment={comment}
                onSubmit={(newComment) => handleUpdateCard(index, { comment: newComment })}
              />
            }
          />
        </ActionPanel>
      );
    },
    [handleUpdateCard],
  );

  const handleClearCards = useCallback(async () => {
    await showToast({
      style: Toast.Style.Success,
      title: "Clear Cards",
      message: "Press ⌘+K to clear all cards",
      primaryAction: {
        title: "Clear",
        shortcut: { modifiers: ["cmd"], key: "k" },
        onAction: async () => {
          setCards([]);
          await LocalStorage.removeItem(STORAGE_KEY);
          await showToast({ style: Toast.Style.Success, title: "Cards Cleared" });
        },
      },
    });
  }, []);

  useEffect(() => {
    async function initializeCards() {
      if (!shouldInitialize) return;

      try {
        setIsLoading(true);
        await closeMainWindow();

        await updateStatus("Getting selected text...");
        let selectedText: string;
        try {
          selectedText = await getSelectedText();
          if (!selectedText?.trim()) {
            throw new Error("No text selected");
          }
        } catch (error) {
          await showToast({
            style: Toast.Style.Failure,
            title: "No Text Selected",
            message: "Please select some text and try again",
          });
          return;
        }

        await updateStatus("Generating cards with Claude...");
        const prompt = `
          Create *three* (3) SRS anki flashcards from the material. 
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
          model: AI.Model.Anthropic_Claude_Haiku,
          creativity: 1,
        });

        await updateStatus("Processing AI response...");
        const parsedCards = await parseAIResponse(aiResponse, updateStatus);

        if (parsedCards.length > 0) {
          setCards(parsedCards);
          await showToast({
            style: Toast.Style.Success,
            title: "Cards Generated",
            message: `Created ${parsedCards.length} cards`,
            primaryAction: {
              title: "Show Cards",
              onAction: () => {
                popToRoot({ clearSearchBar: true });
              },
            },
          });
        }
      } catch (error) {
        console.error("Failed to initialize cards:", error);
        await showToast({
          style: Toast.Style.Failure,
          title: "Failed to generate cards",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        setIsLoading(false);
        setShouldInitialize(false);
      }
    }

    initializeCards();
  }, [shouldInitialize, updateStatus]);

  const renderActions = (card: Card, index: number) => (
    <ActionPanel>
      {!card.isAnswerRevealed && (
        <ActionPanel.Item
          title="Show Answer"
          icon={Icon.Eye}
          onAction={() => handleToggleAnswer(index, card.isAnswerRevealed)}
          shortcut={{ modifiers: [], key: "space" as KeyEquivalent }}
        />
      )}
      {card.isAnswerRevealed && (
        <>
          <ActionPanel.Section>
            {[1, 2, 3, 4].map((rating) => (
              <ActionPanel.Item
                key={rating}
                title={`${rating}`}
                icon={card.rating === rating ? Icon.Star : Icon.StarDisabled}
                onAction={() => handleRating(index, rating)}
                shortcut={{ modifiers: [], key: String(rating) as KeyEquivalent }}
              />
            ))}

            <Action.Push
              title="Add/Edit Comment"
              icon={Icon.Text}
              shortcut={{ modifiers: [], key: "c" }}
              target={
                <CommentForm
                  initialComment={card.comment}
                  onSubmit={(newComment) => handleUpdateCard(index, { comment: newComment })}
                />
              }
            />
          </ActionPanel.Section>

          <ActionPanel.Section title="Card Management">
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

  if (cards.length === 0) {
    return (
      <List isLoading={isLoading} navigationTitle="SRS Cards" searchBarPlaceholder="No cards generated">
        <List.EmptyView
          title="No Cards Available"
          description="Select some text and run the command again"
          icon={Icon.ExclamationMark}
        />
      </List>
    );
  }

  return (
    <List isLoading={isLoading} isShowingDetail navigationTitle="SRS Cards" searchBarPlaceholder="Search cards...">
      {cards.map((card, index) => (
        <List.Item
          key={`${card.question}-${index}`}
          icon={card.rating ? Icon.Star : Icon.StarDisabled}
          title={card.question}
          detail={<List.Item.Detail markdown={getCardDetailMarkdown(card)} />}
          actions={renderActions(card, index)}
        />
      ))}
    </List>
  );
}
