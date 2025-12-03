import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useRevalidator } from "react-router";
import { queryFunctions } from "../../api/query-functions";
import type { SnippetComponentProps } from "../../types/snippets.types";
import { snippetMapper } from "../../utils/mapSnippets";

export default function CodeSnippet({ snippet, onClick, idDetailedView }: SnippetComponentProps) {
  const { revalidate } = useRevalidator();

  const handleMarkSnippet = async (type: "like" | "dislike") => {
    try {
      await queryFunctions.markSnippet(snippet.id, type);
    } catch (error) {
      console.error(error);
    } finally {
      revalidate();
    }
  };

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
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "6px",
              alignItems: "center",
            }}
          >
            <AccountCircleOutlinedIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {snippet.user?.username}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "16px",
              width: "1px",
              backgroundColor: "#e0e0e0",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "6px",
              alignItems: "center",
            }}
          >
            <LanguageOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {snippet.language}
            </Typography>
          </Box>
        </Box>
        {!idDetailedView && (
          <IconButton
            size="small"
            onClick={() => onClick(snippet)}
            sx={{
              padding: 0.5,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateX(2px)",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        )}
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
          <Tooltip
            title={
              <Box
                sx={{
                  maxWidth: "150px",
                  maxHeight: "200px",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                {snippet.marks
                  .filter((mark) => mark.type === "like")
                  .map((mark) => (
                    <Typography key={mark.id} variant="body2">
                      {mark.user.username}
                    </Typography>
                  ))}
                {snippet.marks.filter((mark) => mark.type === "like").length === 0 && (
                  <Typography variant="body2">No likes yet</Typography>
                )}
              </Box>
            }
            arrow
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Typography variant="body1">{snippetMapper.getLikes(snippet)}</Typography>
              <IconButton size="small" onClick={() => handleMarkSnippet("like")}>
                <ThumbUpOutlinedIcon sx={{ color: "green" }} />
              </IconButton>
            </Box>
          </Tooltip>
          <Tooltip
            title={
              <Box
                sx={{
                  maxWidth: "150px",
                  maxHeight: "200px",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                {snippet.marks
                  .filter((mark) => mark.type === "dislike")
                  .map((mark) => (
                    <Typography key={mark.id} variant="body2">
                      {mark.user.username}
                    </Typography>
                  ))}
                {snippet.marks.filter((mark) => mark.type === "dislike").length === 0 && (
                  <Typography variant="body2">No dislikes yet</Typography>
                )}
              </Box>
            }
            arrow
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Typography variant="body1">{snippetMapper.getDislikes(snippet)}</Typography>
              <IconButton size="small" onClick={() => handleMarkSnippet("dislike")}>
                <ThumbDownOutlinedIcon sx={{ color: "red" }} />
              </IconButton>
            </Box>
          </Tooltip>
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
