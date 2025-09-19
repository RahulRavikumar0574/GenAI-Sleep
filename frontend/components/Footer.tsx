"use client";
import React from 'react';
import { Box, Container, Typography, Stack, Link as MuiLink } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 6, py: 4, borderTop: '1px solid rgba(99,102,241,0.12)' }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} GenAI Careers. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            <MuiLink href="/career-guidance" underline="hover" color="inherit">Careers</MuiLink>
            <MuiLink href="/dashboard" underline="hover" color="inherit">Dashboard</MuiLink>
            <MuiLink href="/login" underline="hover" color="inherit">Login</MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
