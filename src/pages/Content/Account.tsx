import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useActionData, useLoaderData, useRevalidator } from "react-router";
import ChangePassword from "../../components/ChangePassword";
import ChangeUsername from "../../components/ChangeUsername";
import UserStatistics from "../../components/UserStatistics";
import type { UserStatistics as UserStatisticsType } from "../../types/auth/auth.types";

interface AccountLoaderData {
  user: {
    id: string;
    username: string;
    role: string;
  };
  statistics: UserStatisticsType;
}

export default function Account() {
  const { user, statistics } = useLoaderData() as AccountLoaderData;
  const actionData = useActionData() as
    | { error?: string; success?: boolean; intent?: string }
    | undefined;
  const { revalidate } = useRevalidator();

  const usernameActionData = actionData?.intent === "changeUsername" ? actionData : undefined;
  const passwordActionData = actionData?.intent === "changePassword" ? actionData : undefined;

  useEffect(() => {
    if (usernameActionData?.success) {
      revalidate();
    }
  }, [usernameActionData?.success, revalidate]);

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
        Account Settings
      </Typography>

      <Box>
        <UserStatistics statistics={statistics} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <ChangeUsername
            currentUsername={user.username}
            actionData={usernameActionData}
            onSuccess={revalidate}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <ChangePassword actionData={passwordActionData} />
        </Box>
      </Box>
    </Box>
  );
}
