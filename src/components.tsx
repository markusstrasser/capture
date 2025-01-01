import { Form, ActionPanel, Action, useNavigation, showToast, Toast } from "@raycast/api";
import { useCallback } from "react";

export const CommentForm = ({
  initialComment,
  onSubmit,
}: {
  initialComment: string;
  onSubmit: (comment: string) => void;
}) => {
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
