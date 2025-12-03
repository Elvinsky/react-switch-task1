import { Add } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate, useRevalidator } from "react-router";
import { queryFunctions } from "../../api/query-functions";
import CodeSnippet from "../../components/Snippet/CodeSnippet";
import CreateSnippetDialog from "../../components/Snippet/CreateSnippetDialog";
import type { SnippetData } from "../../types/snippets.types";

export default function Home() {
  const snippets = useLoaderData();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePublish = async () => {
    if (!language.trim() || !code.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await queryFunctions.createSnippet(language, code);
      setLanguage("");
      setCode("");
      setDialogOpen(false);
      revalidate();
    } catch (error) {
      console.error("Failed to create snippet:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setLanguage("");
      setCode("");
      setDialogOpen(false);
    }
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

      <CreateSnippetDialog
        open={dialogOpen}
        onClose={handleClose}
        language={language}
        code={code}
        isSubmitting={isSubmitting}
        onLanguageChange={setLanguage}
        onCodeChange={setCode}
        onPublish={handlePublish}
      />
    </Box>
  );
}
