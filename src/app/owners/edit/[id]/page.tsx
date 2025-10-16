import prisma from '@/lib/prisma';
import EditOwnerForm from './edit-owner-form';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditOwnerPage(props: PageProps) {
  const { id } = await props.params;
  const ownerId = parseInt(id);

  const owner = await prisma.owner.findUnique({
    where: { id: ownerId },
  });

  if (!owner) {
    return (
      <div className="container mx-auto mt-10 p-4 max-w-lg">
        <p className="text-center text-red-500">Proprietário não encontrado.</p>
      </div>
    );
  }

  return <EditOwnerForm owner={owner} />;
}