import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useRevalidator } from "react-router";
import { queryFunctions } from "../../api/query-functions";

interface CreateSnippetDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateSnippetDialog({ open, onClose }: CreateSnippetDialogProps) {
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { revalidate } = useRevalidator();

  const handlePublish = async () => {
    if (!language.trim() || !code.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await queryFunctions.createSnippet(language, code);
      setLanguage("");
      setCode("");
      onClose();
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
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Snippet</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 2 }}>
          <TextField
            label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="e.g., JavaScript, Python, TypeScript"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            multiline
            rows={10}
            placeholder="Enter your code here..."
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={handleClose} disabled={isSubmitting} sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button
          onClick={handlePublish}
          variant="contained"
          disabled={!language.trim() || !code.trim() || isSubmitting}
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          Publish
        </Button>
      </DialogActions>
    </Dialog>
  );
}
