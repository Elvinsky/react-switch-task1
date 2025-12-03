import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Box, Typography } from "@mui/material";
import type { SnippetComponentProps } from "../../types/snippets.types";
import { snippetMapper } from "../../utils/mapSnippets";

export default function CodeSnippet({ snippet, onClick }: SnippetComponentProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          borderBottom: "1px solid #e0e0e0",
          padding: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "3px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AccountCircleOutlinedIcon />
          <Typography variant="body2">{snippet.user.username}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "3px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LanguageOutlinedIcon />
          <Typography variant="body2">{snippet.language}</Typography>
        </Box>
      </Box>
      <code className="pb-3 pl-3 text-sm">{snippet.code}</code>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          padding: 0.5,
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1">{snippetMapper.getLikes(snippet)}</Typography>
            <ThumbUpOutlinedIcon sx={{ color: "green" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1">{snippetMapper.getDislikes(snippet)}</Typography>
            <ThumbDownOutlinedIcon sx={{ color: "red" }} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <Typography variant="body1">{snippetMapper.getCommentsAmount(snippet)}</Typography>
          <ChatBubbleOutlineOutlinedIcon />
        </Box>
      </Box>
    </Box>
  );
}
