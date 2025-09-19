"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Card, CardContent, Typography, Button, Checkbox, FormControlLabel, Stack, Divider, Avatar } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";

export default function QuizConfirmPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  // If user already confirmed in this session, send them to quiz
  useEffect(() => {
    if (typeof window !== "undefined") {
      const confirmed = sessionStorage.getItem("quizConfirmed");
      if (confirmed === "true") {
        router.replace("/quiz");
      }
    }
  }, [router]);

  const handleStart = () => {
    sessionStorage.setItem("quizConfirmed", "true");
    router.push("/quiz");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 3, bgcolor: "linear-gradient(135deg, #f0fdfa 0%, #e0e7ff 100%)" }}>
      <Card sx={{ maxWidth: 720, width: "100%", borderRadius: 4, boxShadow: 8 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: "#06b6d4", width: 56, height: 56 }}>
              <QuizIcon />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={800} color="#0f172a">Before You Start</Typography>
              <Typography variant="subtitle1" color="#475569">Please review the quiz rules and confirm to proceed.</Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1} mb={2}>
            <Typography variant="h6" fontWeight={700} color="#1e293b">Quick Rules</Typography>
            <ul style={{ marginTop: 0 }}>
              <li><Typography variant="body1">You have 2 minutes to complete 10 questions.</Typography></li>
              <li><Typography variant="body1">You can move forward only after selecting an answer.</Typography></li>
              <li><Typography variant="body1">Your selections help personalize career guidance.</Typography></li>
              <li><Typography variant="body1">Timer continues to run; leaving the page may end the quiz.</Typography></li>
            </ul>
          </Stack>

          <FormControlLabel
            control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} color="primary" />}
            label={<Typography>I understand the rules and consent to use my responses to personalize recommendations.</Typography>}
            sx={{ mb: 2 }}
          />

          <Box textAlign="right">
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={!agreed}
              onClick={handleStart}
              sx={{ borderRadius: 3, px: 5, py: 1.3, fontWeight: 700, background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)" }}
            >
              Start Quiz
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

