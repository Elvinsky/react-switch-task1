import { Box, Card, CardContent, Typography } from "@mui/material";
import type { UserStatistics as UserStatisticsType } from "../types/auth/auth.types";

interface UserStatisticsProps {
  statistics: UserStatisticsType;
}

export default function UserStatistics({ statistics }: UserStatisticsProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2, fontWeight: 600 }}>
          Statistics
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Snippets Count:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {statistics.snippetsCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Rating:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              ~{Math.round(statistics.rating)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Comments Count:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {statistics.commentsCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Likes Count:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {statistics.likesCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Dislikes Count:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {statistics.dislikesCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Questions Count:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {statistics.questionsCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Correct Answers Count:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {statistics.correctAnswersCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Regular Answers Count:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {statistics.regularAnswersCount}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
