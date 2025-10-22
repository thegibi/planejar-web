'use client';

import { deleteFarm } from '@/actions/farm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';

interface DeleteFarmButtonProps {
  farmId: number;
  farmName: string;
}

export function DeleteFarmButton({ farmId, farmName }: DeleteFarmButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      const result = await deleteFarm(farmId);
      
      if (result.success) {
        toast.success(result.message || 'Fazenda excluída com sucesso!');
        setOpen(false);
      } else {
        toast.error(result.message || 'Erro ao excluir fazenda');
      }
    } catch (error) {
      console.error('Erro ao deletar fazenda:', error);
      toast.error('Erro inesperado ao excluir a fazenda');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button 
              variant="link" 
              size="icon"
              disabled={isDeleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <FaTrash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent className='bg-red-600 text-white' arrowClassName="bg-red-600 fill-red-600">
          <p>Excluir Fazenda</p>
        </TooltipContent>
      </Tooltip>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir a fazenda <strong>&quot;{farmName}&quot;</strong>?
            Esta ação não pode ser desfeita e irá remover todos os dados relacionados, incluindo plantios, talhões e aplicações.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}