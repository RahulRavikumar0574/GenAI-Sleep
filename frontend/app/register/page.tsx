"use client";
import React from 'react';
import LoginForm from '../../components/LoginForm';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const handleAuth = () => {
    router.push('/login');
  };

  return <LoginForm onAuth={handleAuth} isRegister />;
}
