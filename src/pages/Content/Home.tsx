import { Button } from "@mui/material";
import { useAuth } from "../../stores/useAuth";

export default function Home() {
  const logout = useAuth((state) => state.logout);
  return (
    <p>
      <Button onClick={logout}>Logout</Button>
    </p>
  );
}
