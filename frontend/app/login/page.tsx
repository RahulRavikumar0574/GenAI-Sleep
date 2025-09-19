"use client";
import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const handleAuth = (data: unknown) => {
    if (
      typeof data === 'object' &&
      data !== null &&
      'token' in data &&
      typeof (data as { token?: unknown }).token === 'string'
    ) {
      const { token, user } = data as { token: string; user?: unknown };
      localStorage.setItem('token', token);
      if (user !== undefined) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      router.push('/dashboard');
    }
  };

  return <LoginForm onAuth={handleAuth} />;
}
