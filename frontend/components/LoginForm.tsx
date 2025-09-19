import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

export default function LoginForm({ onAuth, isRegister = false }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const body = isRegister ? { username, email, password } : { email, password };
      const res = await fetch(
        `/api/auth/${isRegister ? 'register' : 'login'}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Error');
      onAuth(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" mb={2}>{isRegister ? 'Register' : 'Login'}</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {isRegister && (
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
      )}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
        {isRegister ? 'Register' : 'Login'}
      </Button>
    </Box>
  );
}
