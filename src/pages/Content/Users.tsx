import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router";
import type { UsersResponse } from "../../types/api/api.types";
import type { User } from "../../types/snippets.types";

export default function Users() {
  const { data: users } = useLoaderData() as UsersResponse;
  const navigate = useNavigate();

  const handleRowClick = (userId: string) => {
    navigate(`/user/${userId}`);
  };

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
        Users
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.data.length > 0 ? (
              users.data.map((user: User) => (
                <TableRow
                  key={user.id}
                  onClick={() => handleRowClick(user.id)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No users found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
