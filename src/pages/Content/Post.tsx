import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useParams, useRevalidator } from "react-router";
import { queryFunctions } from "../../api/query-functions";
import CodeSnippet from "../../components/Snippet/CodeSnippet";
import CommentItem from "../../components/Snippet/CommentItem";
import type { SnippetComment, SnippetData } from "../../types/snippets.types";

export default function Post() {
  const { data } = useLoaderData() as SnippetData;
  const { id } = useParams();
  const [commentText, setCommentText] = useState("");
  const { revalidate } = useRevalidator();

  const handlePublish = async () => {
    if (!id) return;
    await queryFunctions.addComment(id, commentText);
    setCommentText("");
    revalidate();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
      }}
    >
      <CodeSnippet snippet={data} onClick={() => {}} idDetailedView={true} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <TextField
          multiline
          rows={4}
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handlePublish}
            disabled={!commentText.trim()}
            sx={{
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Publish
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          backgroundColor: "background.paper",
          overflowY: "scroll",
          maxHeight: "600px",
        }}
      >
        {data.comments.length > 0 ? (
          data.comments
            .reverse()
            .map((comment: SnippetComment) => <CommentItem key={comment.id} comment={comment} />)
        ) : (
          <Box sx={{ padding: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              No comments yet
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
