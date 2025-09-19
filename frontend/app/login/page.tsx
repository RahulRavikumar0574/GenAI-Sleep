"use client";
import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleAuth = (data: any) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      setSuccess(true);
      router.push('/dashboard');
    }
  };

  return <LoginForm onAuth={handleAuth} />;
}
