import { getAllOwners } from '@/actions/owner';
import { CreateFarmForm } from '@/components/farms';

export default async function CreateFarmPage() {
  const ownersResult = await getAllOwners();
  const owners = ownersResult.success ? ownersResult.data : [];

  return <CreateFarmForm owners={owners} />;
}
