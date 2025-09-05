'use client';

import { createPlanting, getFarmsWithPlots } from '@/actions/plantings';
import { MultiSelect } from "@/components/multi-select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlantingFormValues, plantingSchema } from '@/validations/plantings';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Plot } from '~/lib/generated/prisma-client';

export default function CreatePlantingPage() {
  const [farms, setFarms] = useState<any[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<any | null>(null);
  const [filteredPlots, setFilteredPlots] = useState<Plot[]>([]);



  const handleFarmChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const farmId = parseInt(e.target.value);
    const farm = farms.find(f => f.id === farmId);
    setSelectedFarm(farm);
    setFilteredPlots(farm ? farm.plots : []);
  };



  const form = useForm<PlantingFormValues>({
    resolver: zodResolver(plantingSchema) as any,
    defaultValues: {
      crop: '',
      variety: '',
      population: 0,
      plantingDate: '',
      farmId: 0,
      plotIds: [],
    },
  });

  const onSubmit = async (data: PlantingFormValues) => {
    const formData = new FormData();
    formData.append('crop', data.crop);
    formData.append('variety', data.variety);
    formData.append('population', data.population.toString());
    formData.append('plantingDate', data.plantingDate);
    formData.append('farmId', data.farmId.toString());
    
    data.plotIds.forEach(id => formData.append('plotIds', id.toString()));

    await createPlanting(formData);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getFarmsWithPlots();
      setFarms(data);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Plantio</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label className='mb-2' htmlFor="farmId">Fazenda</Label>
          <select id="farmId" name="farmId" required onChange={handleFarmChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option value="">Selecione uma Fazenda</option>
            {farms.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.name}
              </option>
            ))}
          </select>
        </div>
        
          <Controller
            control={form.control}
            name="plotIds"
            render={({ field }) => (
            <div>
              <Label className='mb-2'>Talhões</Label>
              <MultiSelect
                options={selectedFarm?.plots.map((plot: any) => ({ label: `${plot.name} (${plot.area} ha)`, value: plot.id.toString() })) || []}
                value={field.value.map(id => id.toString())}
                onValueChange={(values) => field.onChange(values.map(v => parseInt(v)))}
                placeholder="Selecione um ou mais talhões..."
              />
              {form.formState.errors.plotIds && <p className="text-red-500 text-sm mt-1">{form.formState.errors.plotIds.message}</p>}
            </div>
          )}
        />
        
        <div>
          <Label className='mb-2' htmlFor="crop">Cultura</Label>
          <Input id="crop" name="crop" type="text" placeholder="Ex: Soja" required />
        </div>
        <div>
          <Label className='mb-2' htmlFor="variety">Variedade</Label>
          <Input id="variety" name="variety" type="text" placeholder="Ex: M8344" required />
        </div>
        <div>
          <Label className='mb-2' htmlFor="population">População</Label>
          <Input id="population" name="population" type="number" step="1" placeholder="Ex: 250000" required />
        </div>
        <div>
          <Label className='mb-2' htmlFor="plantingDate">Data do Plantio</Label>
          <Input id="plantingDate" name="plantingDate" type="date" required />
        </div>

        <Button type="submit">Cadastrar Plantio</Button>
      </form>
    </div>
  );
}