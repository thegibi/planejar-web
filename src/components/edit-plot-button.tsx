'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { FaPencilAlt } from 'react-icons/fa';

interface EditPlotButtonProps {
  plotId: number;
}

export function EditPlotButton({ plotId }: EditPlotButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={`/plots/edit/${plotId}`}>
          <Button 
            variant="link" 
            size="icon"
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <FaPencilAlt className="h-4 w-4" />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent className="bg-green-600 text-white" arrowClassName="bg-green-600 fill-green-600">
        <p>Editar Talhão</p>
      </TooltipContent>
    </Tooltip>
  );
}