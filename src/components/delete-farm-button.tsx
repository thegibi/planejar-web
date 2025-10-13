'use client';

import { deleteFarm } from '@/actions/farm';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

interface DeleteFarmButtonProps {
  farmId: number;
  farmName: string;
}

export function DeleteFarmButton({ farmId, farmName }: DeleteFarmButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Tem certeza que deseja deletar a fazenda "${farmName}"? Esta ação não pode ser desfeita.`
    );

    if (!confirmed) return;

    setIsDeleting(true);
    
    try {
      await deleteFarm(farmId);
    } catch (error) {
      console.error('Erro ao deletar fazenda:', error);
      alert('Erro ao deletar a fazenda. Tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="link" 
          size="icon"
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <FaTrash className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className='bg-red-600 text-white' arrowClassName="bg-red-600 fill-red-600">
        <p>Excluir Fazenda</p>
      </TooltipContent>
    </Tooltip>
  );
}