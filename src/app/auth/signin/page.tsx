'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email ou senha inválidos');
      } else {
        const session = await getSession();
        if (session) {
          router.push('/farms/list');
          router.refresh();
        }
      }
    } catch (error) {
      setError('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-700">Planejar</h2>
          <p className="mt-2 text-sm text-gray-600">
            Faça login em sua conta
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className='mb-2'>Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <Label htmlFor="password" className='mb-2'>Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <Link
                href="/auth/signup"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}