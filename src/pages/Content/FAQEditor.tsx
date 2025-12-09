import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate, useParams, useRevalidator } from "react-router";
import { queryFunctions } from "../../api/query-functions";
import type { FAQResponse } from "../../types/faq.types";

export default function FAQEditor() {
  const faq = useLoaderData() as FAQResponse;
  const { id } = useParams();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  const [title, setTitle] = useState(faq.data.title);
  const [description, setDescription] = useState(faq.data.description);
  const [code, setCode] = useState(faq.data.code || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!id || !title.trim() || !description.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await queryFunctions.updateFAQ(id, title, description, code.trim() || undefined);
      revalidate();
      navigate("/faq");
    } catch (error) {
      console.error("Failed to update FAQ:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/faq");
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
        Edit FAQ
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Question title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              rows={6}
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
                rows={15}
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
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                onClick={handleCancel}
                disabled={isSubmitting}
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                variant="contained"
                disabled={!title.trim() || !description.trim() || isSubmitting}
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
