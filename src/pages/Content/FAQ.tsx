import { Add } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import CreateFAQDialog from "../../components/FAQ/CreateFAQDialog";
import FAQCard from "../../components/FAQ/FAQCard";
import type { FAQsResponse } from "../../types/faq.types";

export default function FAQ() {
  const { data: faqs } = useLoaderData() as FAQsResponse;
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", paddingBottom: 10 }}>
      <div className="flex flex-col items-center justify-center gap-4">
        {faqs.data.map((faq) => (
          <FAQCard key={faq.id} faq={faq} onClick={() => navigate(`/faq/edit/${faq.id}`)} />
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

      <CreateFAQDialog open={dialogOpen} onClose={handleClose} />
    </Box>
  );
}
