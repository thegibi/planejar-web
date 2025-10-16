'use client';

import { deletePlot } from '@/actions/plot';
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

interface DeletePlotButtonProps {
  plotId: number;
  plotName: string;
}

export function DeletePlotButton({ plotId, plotName }: DeletePlotButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      const result = await deletePlot(plotId);
      
      if (result?.success) {
        toast.success(`Talhão "${plotName}" excluído com sucesso!`);
        setOpen(false);
      } else {
        toast.error(result?.message || 'Erro ao excluir o talhão. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao excluir talhão:', error);
      toast.error('Erro inesperado ao excluir o talhão. Tente novamente.');
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
          <p>Excluir Talhão</p>
        </TooltipContent>
      </Tooltip>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o talhão &ldquo;{plotName}&rdquo;? 
            Esta ação não pode ser desfeita e removerá permanentemente todos os dados associados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}