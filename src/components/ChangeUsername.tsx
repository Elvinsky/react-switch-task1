import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSubmit } from "react-router";

interface ChangeUsernameProps {
  currentUsername: string;
  actionData?: { error?: string; success?: boolean; intent?: string };
  onSuccess?: () => void;
}

export default function ChangeUsername({
  currentUsername,
  actionData,
  onSuccess,
}: ChangeUsernameProps) {
  const submit = useSubmit();
  const [username, setUsername] = useState(currentUsername);

  useEffect(() => {
    setUsername(currentUsername);
  }, [currentUsername]);

  useEffect(() => {
    if (actionData?.success && onSuccess) {
      onSuccess();
    }
  }, [actionData?.success, onSuccess]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("intent", "changeUsername");
    submit(formData, { method: "post" });
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2, fontWeight: 600 }}>
          Change Username
        </Typography>
        <form
          onSubmit={handleUsernameSubmit}
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
            <TextField
              label="Username"
              value={username}
              onChange={handleUsernameChange}
              fullWidth
              variant="outlined"
            />
            {actionData?.error && <Alert severity="error">{actionData.error}</Alert>}
            {actionData?.success && (
              <Alert severity="success">Username changed successfully!</Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={username === currentUsername}
              sx={{ alignSelf: "flex-start", marginTop: "auto" }}
            >
              Apply
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
