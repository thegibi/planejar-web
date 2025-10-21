'use client';

import { DeleteFarmButton, EditFarmButton } from '@/components/farms';
import { TableCell, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';

interface Farm {
  id: number;
  name: string;
  area: number;
  sprayTank: string | null;
  fertilizerSpreader: string | null;
  location: string;
  owner: {
    name: string;
  };
}

interface ClickableFarmRowProps {
  farm: Farm;
}

export function ClickableFarmRow({ farm }: ClickableFarmRowProps) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/farms/details/${farm.id}`);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <TableRow 
            className="even:bg-gray-50 hover:bg-gray-100 cursor-pointer"
            onClick={handleRowClick}
          >
            <TableCell className='capitalize'>{farm.name.toLocaleLowerCase()}</TableCell>
            <TableCell className='capitalize'>{farm.owner.name.toLocaleLowerCase()}</TableCell>
            <TableCell>{farm.area}</TableCell>
            <TableCell>{farm.sprayTank}</TableCell>
            <TableCell>{farm.fertilizerSpreader || <span className="text-gray-500">N/A</span>}</TableCell>
            <TableCell className='capitalize'>{farm.location.toLocaleLowerCase()}</TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end" onClick={(e) => e.stopPropagation()}>
                <EditFarmButton farmId={farm.id} />
                <DeleteFarmButton farmId={farm.id} farmName={farm.name} />
              </div>
            </TableCell>
          </TableRow>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ver detalhes da fazenda</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}