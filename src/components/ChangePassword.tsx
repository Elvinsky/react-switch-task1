import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSubmit } from "react-router";

interface ChangePasswordProps {
  actionData?: { error?: string; success?: boolean; intent?: string };
}

export default function ChangePassword({ actionData }: ChangePasswordProps) {
  const submit = useSubmit();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    formData.append("intent", "changePassword");
    submit(formData, { method: "post" });
    setNewPassword("");
    setConfirmPassword("");
  };

  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;
  const isPasswordFormValid = passwordsMatch && newPassword.length > 0;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2, fontWeight: 600 }}>
          Change Password
        </Typography>
        <form
          onSubmit={handlePasswordSubmit}
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
            <TextField
              name="newPassword"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={handlePasswordChange}
              fullWidth
              variant="outlined"
              error={confirmPassword.length > 0 && !passwordsMatch}
              helperText={
                confirmPassword.length > 0 && !passwordsMatch ? "Passwords do not match" : ""
              }
            />
            {actionData?.error && <Alert severity="error">{actionData.error}</Alert>}
            {actionData?.success && (
              <Alert severity="success">Password changed successfully!</Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={!isPasswordFormValid}
              sx={{ alignSelf: "flex-start", marginTop: "auto" }}
            >
              Change Password
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
