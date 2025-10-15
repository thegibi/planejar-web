'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { FaPencilAlt } from 'react-icons/fa';

interface EditInputButtonProps {
  inputId: number;
}

export function EditInputButton({ inputId }: EditInputButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={`/inputs/edit/${inputId}`}>
          <Button variant="link" size="icon">
            <FaPencilAlt className="h-4 w-4 text-green-600" />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent className="bg-green-600 text-white" arrowClassName="bg-green-600 fill-green-600">
        <p>Editar Insumo</p>
      </TooltipContent>
    </Tooltip>
  );
}