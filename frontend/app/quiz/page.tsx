"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Box, Typography, Button, Card, CardContent, Radio, RadioGroup, FormControlLabel, Stack, Avatar, LinearProgress } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const QUESTIONS = [
  { q: 'Which subject do you enjoy the most?', options: ['Math', 'Biology', 'History', 'Law'] },
  { q: 'Do you prefer working with people or data?', options: ['People', 'Data', 'Both', 'Neither'] },
  { q: 'Which activity excites you?', options: ['Solving puzzles', 'Writing stories', 'Debating', 'Doing experiments'] },
  { q: 'What is your ideal work environment?', options: ['Office', 'Lab', 'Courtroom', 'Classroom'] },
  { q: 'Which skill describes you best?', options: ['Analytical', 'Creative', 'Persuasive', 'Empathetic'] },
  { q: 'What motivates you?', options: ['Discovery', 'Helping others', 'Justice', 'Knowledge'] },
  { q: 'How do you handle problems?', options: ['Research', 'Discussion', 'Negotiation', 'Innovation'] },
  { q: 'Which career sounds appealing?', options: ['Scientist', 'Journalist', 'Lawyer', 'Teacher'] },
  { q: 'Do you like structured or flexible tasks?', options: ['Structured', 'Flexible', 'Both', 'Neither'] },
  { q: 'What is your favorite way to learn?', options: ['Experiments', 'Reading', 'Debate', 'Observation'] },
];

const TOTAL_TIME = 120; // seconds

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState(TOTAL_TIME);
  const [finished, setFinished] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  // Guard: ensure user confirmed before entering quiz
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const confirmed = sessionStorage.getItem('quizConfirmed');
    if (confirmed === 'true') {
      setCanProceed(true);
    } else {
      router.replace('/quiz/confirm');
    }
  }, [router]);

  useEffect(() => {
    if (timer > 0 && !finished) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else if (timer === 0 && !finished) {
      setFinished(true);
      setTimeout(() => {
        try { sessionStorage.removeItem('quizConfirmed'); } catch {}
        window.location.href = '/career-guidance';
      }, 1000);
    }
  }, [timer, finished]);

  const handleOption = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[current] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
      // Redirect to career guidance after a short delay
      setTimeout(() => {
        try { sessionStorage.removeItem('quizConfirmed'); } catch {}
        window.location.href = '/career-guidance';
      }, 1000);
    }
  };

  // While authorization guard hasn't allowed entry yet, render nothing to avoid flash
  if (!canProceed) {
    return null;
  }

  if (finished) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
          <Typography variant="h4" color="primary" gutterBottom>
            Quiz Complete!
          </Typography>
          <Typography variant="body1">Redirecting to your career guidance...</Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #f0fdfa 0%, #e0e7ff 100%)', p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Stack spacing={3} alignItems="center" sx={{ width: '100%', maxWidth: 500 }}>
        <LinearProgress
          variant="determinate"
          value={((current + 1) / QUESTIONS.length) * 100}
          sx={{ width: '100%', height: 8, borderRadius: 5, boxShadow: 2 }}
        />
        <Card sx={{ borderRadius: 5, boxShadow: 8, p: 4, minWidth: 400, maxWidth: 500, width: '100%', background: 'rgba(255,255,255,0.98)' }}>
          <CardContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="h6" color="primary" fontWeight={700}>
                Question {current + 1} / {QUESTIONS.length}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ bgcolor: '#06b6d4', width: 36, height: 36 }}>
                  <AccessTimeIcon />
                </Avatar>
                <Typography
                  variant="h6"
                  color={timer < 20 ? 'error' : 'text.primary'}
                  fontWeight={700}
                  sx={timer <= 10 ? { animation: 'blinker 1s linear infinite' } : {}}
                >
                  {formatTime(timer)}
                </Typography>
                {/* Blinking animation style */}
                <style jsx global>{`
                  @keyframes blinker {
                    50% { opacity: 0; }
                  }
                `}</style>
              </Stack>
            </Stack>
            <Box mb={3}>
              <Typography variant="h5" fontWeight={600} color="#1e293b" mb={2}>
                {QUESTIONS[current].q}
              </Typography>
              <RadioGroup
                value={answers[current] || ''}
                onChange={e => handleOption(e.target.value)}
              >
                {QUESTIONS[current].options.map(option => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="primary" />}
                    label={<Typography fontWeight={500}>{option}</Typography>}
                    sx={{ mb: 1, borderRadius: 2, background: '#f1f5f9', px: 2, py: 1, '&.Mui-checked': { background: '#e0e7ff' } }}
                  />
                ))}
              </RadioGroup>
            </Box>
            <Box mt={4} textAlign="right">
              <Button
                variant="contained"
                color="primary"
                disabled={!answers[current]}
                onClick={handleNext}
                sx={{ borderRadius: 3, px: 5, py: 1.2, fontWeight: 700, fontSize: '1.1rem', background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)' }}
              >
                {current === QUESTIONS.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

