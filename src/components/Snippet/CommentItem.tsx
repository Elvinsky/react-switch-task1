import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Box, Typography } from "@mui/material";
import type { SnippetComment } from "../../types/snippets.types";

interface CommentItemProps {
  comment: SnippetComment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        padding: 2,
        borderBottom: "1px solid #e0e0e0",
        "&:last-child": {
          borderBottom: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <AccountCircleOutlinedIcon fontSize="small" />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {comment.user?.username}
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ color: "text.primary", paddingLeft: 4 }}>
        {comment.content}
      </Typography>
    </Box>
  );
}
