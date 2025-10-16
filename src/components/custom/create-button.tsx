'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CreateButton({ path }: { path: string }) {
  return (
    <Link href={path}>
      <Button variant="default">Cadastrar</Button>
    </Link>
  );
}