import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import type { FAQComponentProps } from "../../types/faq.types";

export default function FAQCard({ faq, onClick }: FAQComponentProps) {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        padding: 2,
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
      onClick={() => onClick(faq)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1.5,
            flex: 1,
          }}
        >
          <TrackChangesOutlinedIcon sx={{ color: "primary.main" }} />
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600, fontFamily: "monospace" }}>
            {faq.title}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onClick(faq);
          }}
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
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <AccountCircleOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
        <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "monospace" }}>
          asked by user: {faq.user.username.toUpperCase()}
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
        {faq.description}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
        }}
      >
        <RemoveRedEyeOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {faq.viewsCount ?? 0}
        </Typography>
      </Box>
    </Box>
  );
}
