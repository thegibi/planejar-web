'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FaPen } from 'react-icons/fa';

interface EditOwnerButtonProps {
  ownerId: number;
}

export function EditOwnerButton({ ownerId }: EditOwnerButtonProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/owners/edit/${ownerId}`);
  };

  return (
    <Button
      size="sm"
      variant="link"
      onClick={handleEdit}
      className="h-8 w-8 p-0 border-green-600 text-green-600 hover:bg-green-50"
    >
      <FaPen className="h-3 w-3" />
    </Button>
  );
}