import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRevalidator } from "react-router";
import { queryFunctions } from "../../api/query-functions";

interface CreateFAQDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateFAQDialog({ open, onClose }: CreateFAQDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { revalidate } = useRevalidator();

  const handlePublish = async () => {
    if (!title.trim() || !description.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await queryFunctions.createFAQ(title, description, code.trim() || undefined);
      setTitle("");
      setDescription("");
      setCode("");
      onClose();
      revalidate();
    } catch (error) {
      console.error("Failed to create FAQ:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setTitle("");
      setDescription("");
      setCode("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Ask a question
        <Button
          onClick={handleClose}
          sx={{ minWidth: "auto", padding: 0.5 }}
          disabled={isSubmitting}
        >
          ×
        </Button>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 2 }}>
          <TextField
            label="Question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Question title"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Question description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            placeholder="Question description"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Attached Code:
            </Typography>
            <TextField
              value={code}
              onChange={(e) => setCode(e.target.value)}
              multiline
              rows={10}
              placeholder=""
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                },
                "& .MuiInputBase-input": {
                  fontFamily: "monospace",
                },
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={handleClose} disabled={isSubmitting} sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button
          onClick={handlePublish}
          variant="contained"
          disabled={!title.trim() || !description.trim() || isSubmitting}
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          Publish
        </Button>
      </DialogActions>
    </Dialog>
  );
}
