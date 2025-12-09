import { Box, Card, CardContent, Typography } from "@mui/material";
import { useLoaderData } from "react-router";
import UserStatistics from "../../components/UserStatistics";
import type { UserStatistics as UserStatisticsType } from "../../types/auth/auth.types";
import type { User } from "../../types/snippets.types";

interface UserPageLoaderData {
  user: User;
  statistics: UserStatisticsType;
}

export default function UserProfile() {
  const { user, statistics } = useLoaderData() as UserPageLoaderData;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: 3,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
        User Profile
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 3, justifyContent: "center" }}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" sx={{ marginBottom: 2, fontWeight: 600 }}>
              User Information
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  ID:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {user.id}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Username:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {user.username}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Role:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {user.role}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <UserStatistics statistics={statistics} />
      </Box>
    </Box>
  );
}
