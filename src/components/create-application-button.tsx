'use client';

import { Button } from '@/components/ui/button';
import { Sprout } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CreateApplicationButtonProps {
  plantingId: number;
  farmId: number;
}

export function CreateApplicationButton({ plantingId, farmId }: CreateApplicationButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    // Navegar para a página de criação de aplicação passando tanto farmId quanto plantingId como query params
    router.push(`/applications/create/${farmId}?plantingId=${plantingId}`);
  };

  return (
    <Button
      onClick={handleClick}
      size="sm"
      variant="outline"
      className="flex items-center gap-2"
    >
      <Sprout className="h-4 w-4" />
      Nova Aplicação
    </Button>
  );
}