"use client";
import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleAuth = (data: unknown) => {
    if (
      typeof data === 'object' &&
      data !== null &&
      'token' in data &&
      typeof (data as any).token === 'string'
    ) {
      localStorage.setItem('token', (data as any).token);
      if ('user' in data) {
        localStorage.setItem('user', JSON.stringify((data as any).user));
      }
      setSuccess(true);
      router.push('/dashboard');
    }
  };

  return <LoginForm onAuth={handleAuth} />;
}
