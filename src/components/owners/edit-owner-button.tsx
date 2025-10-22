'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';
import { FaPencilAlt } from 'react-icons/fa';

interface EditOwnerButtonProps {
  ownerId: number;
}

export function EditOwnerButton({ ownerId }: EditOwnerButtonProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/owners/edit/${ownerId}`);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="link"
          onClick={handleEdit}
          className="text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          <FaPencilAlt className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-green-600 text-white" arrowClassName="bg-green-600 fill-green-600">
        <p>Editar Proprietário</p>
      </TooltipContent>
    </Tooltip>
  );
}