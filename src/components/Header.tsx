import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, IconButton } from "@mui/material";
import { useAuth } from "../stores/useAuth";

export default function Header() {
  const logout = useAuth((state) => (state as { logout: () => Promise<void> }).logout);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 left-0 h-[95px] bg-gray-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6">
        <Box sx={{ width: 120 }} />
        <h1 className="text-center font-bold text-2xl text-gray-800">REACT TASK</h1>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="large" sx={{ color: "grey.600" }}>
            <AccountCircleIcon />
          </IconButton>
          <Button variant="contained" color="error" size="small" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </div>
    </header>
  );
}
