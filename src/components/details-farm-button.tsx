'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { FaInfoCircle } from 'react-icons/fa';

interface DetailsFarmButtonProps {
  farmId: number;
}

export function DetailsFarmButton({ farmId }: DetailsFarmButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={`/farms/details/${farmId}`}>
          <Button 
            variant="link" 
            size="icon"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-0"
          >
            <FaInfoCircle className="h-4 w-4" />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent className="bg-blue-600 text-white" arrowClassName="bg-blue-600 fill-blue-600">
        <p>Ver Detalhes</p>
      </TooltipContent>
    </Tooltip>
  );
}