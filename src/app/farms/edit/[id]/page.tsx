import { getAllOwners } from '@/actions/owner';
import prisma from '@/lib/prisma';
import EditFarmForm from './edit-farm-form';

export default async function EditFarmPage(
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const farmId = parseInt(params.id);

  const [farm, ownersResult] = await Promise.all([
    prisma.farm.findUnique({
      where: { id: farmId },
      include: { owner: true },
    }),
    getAllOwners(),
  ]);

  if (!farm) {
    return (
      <div className="container mx-auto mt-10 p-4 max-w-lg">
        <p className="text-center text-red-500">Fazenda não encontrada.</p>
      </div>
    );
  }

  const owners = ownersResult.success ? ownersResult.data : [];

  return <EditFarmForm farm={farm} owners={owners} />;
}