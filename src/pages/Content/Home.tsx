import { Add } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import CodeSnippet from "../../components/Snippet/CodeSnippet";
import CreateSnippetDialog from "../../components/Snippet/CreateSnippetDialog";
import type { SnippetData } from "../../types/snippets.types";

export default function Home() {
  const snippets = useLoaderData();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", paddingBottom: 10 }}>
      <div className="flex flex-col items-center justify-center gap-4">
        {snippets.data.data.map((snippet: SnippetData) => (
          <CodeSnippet
            key={snippet.id}
            snippet={snippet}
            onClick={() => navigate(`/post/${snippet.id}`)}
            idDetailedView={false}
          />
        ))}
      </div>

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setDialogOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
        }}
      >
        <Add />
      </Fab>

      <CreateSnippetDialog open={dialogOpen} onClose={handleClose} />
    </Box>
  );
}
