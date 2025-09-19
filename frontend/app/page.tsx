"use client";
import React from 'react';
import { Typography, Box, Button, Card, CardContent, Container, Chip, Stack } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box sx={{
      minHeight: 'calc(100vh - 120px)',
      background: 'linear-gradient(135deg, #eef2ff 0%, #ecfeff 50%, #ffffff 100%)',
      display: 'flex',
      alignItems: 'center',
    }}>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
          gap: 4,
          alignItems: 'center'
        }}>
          <Box sx={{ gridRow: 1, gridColumn: 1 }}>
            <Typography variant="overline" color="secondary" sx={{ letterSpacing: 1.2 }}>Future-ready careers</Typography>
            <Typography variant="h2" fontWeight={800} sx={{ lineHeight: 1.1 }} gutterBottom>
              Discover your path with AI-guided career insights
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Build your profile, explore roles, see skill gaps, and get a personalized learning roadmap.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
              <Button component={Link} href="/dashboard" variant="contained" size="large">
                Get Started
              </Button>
              <Button component={Link} href="/career-guidance" variant="outlined" size="large">
                Explore Careers
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              <Chip label="Gap Analysis" color="primary" variant="outlined" />
              <Chip label="Personalized Roadmap" color="secondary" variant="outlined" />
              <Chip label="Market Trends" variant="outlined" />
            </Stack>
          </Box>
          <Box sx={{ gridRow: 1, gridColumn: 2 }}>
            <Card sx={{ borderRadius: 4, boxShadow: 6, p: 1,
              background: 'linear-gradient(120deg, rgba(99,102,241,0.1), rgba(6,182,212,0.1))' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">Popular Categories</Typography>
                <Box sx={{
                  mt: 1,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: 2
                }}>
                  {[
                    { title: 'Engineering & Tech', href: '/career-guidance' },
                    { title: 'Medical & Healthcare', href: '/career-guidance' },
                    { title: 'Business & Management', href: '/career-guidance' },
                    { title: 'Data & Analytics', href: '/career-guidance' },
                  ].map((c) => (
                    <Box key={c.title}>
                      <Link href={c.href} style={{ textDecoration: 'none' }}>
                        <Card variant="outlined" sx={{ borderRadius: 3, ':hover': { boxShadow: 4 } }}>
                          <CardContent>
                            <Typography fontWeight={700}>{c.title}</Typography>
                            <Typography variant="body2" color="text.secondary">Explore roles →</Typography>
                          </CardContent>
                        </Card>
                      </Link>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
