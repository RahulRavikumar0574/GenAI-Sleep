"use client";
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import Link from 'next/link';
import { useAppTheme } from '../providers/AppThemeProvider';

export default function NavBar() {
  const { themeKey, setThemeKey } = useAppTheme();
  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(99,102,241,0.12)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>GenAI Careers</Link>
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Tooltip title="Theme">
              <ToggleButtonGroup
                size="small"
                color="primary"
                value={themeKey}
                exclusive
                onChange={(_, v) => v && setThemeKey(v)}
                sx={{ mr: 1 }}
              >
                <ToggleButton value="blue">Blue</ToggleButton>
                <ToggleButton value="purple">Purple</ToggleButton>
                <ToggleButton value="mint">Mint</ToggleButton>
              </ToggleButtonGroup>
            </Tooltip>
            <Button component={Link} href="/dashboard" color="inherit">Dashboard</Button>
            <Button component={Link} href="/career-guidance" color="inherit">Explore</Button>
            <Button component={Link} href="/quiz/confirm" color="inherit">Quiz</Button>
            <Button component={Link} href="/login" variant="contained" color="primary">Login</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

