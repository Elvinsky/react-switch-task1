import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface CreateSnippetDialogProps {
  open: boolean;
  onClose: () => void;
  language: string;
  code: string;
  isSubmitting: boolean;
  onLanguageChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  onPublish: () => void;
}

export default function CreateSnippetDialog({
  open,
  onClose,
  language,
  code,
  isSubmitting,
  onLanguageChange,
  onCodeChange,
  onPublish,
}: CreateSnippetDialogProps) {
  const handleClose = () => {
    if (!isSubmitting) {
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
            onChange={(e) => onLanguageChange(e.target.value)}
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
            onChange={(e) => onCodeChange(e.target.value)}
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
          onClick={onPublish}
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
