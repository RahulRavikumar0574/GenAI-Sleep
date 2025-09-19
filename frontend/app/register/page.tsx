"use client";
import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleAuth = (data: unknown) => {
    setSuccess(true);
    router.push('/login');
  };

  return <LoginForm onAuth={handleAuth} isRegister />;
}
