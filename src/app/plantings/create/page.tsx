'use client';

import { createPlanting, getFarmsWithPlots } from '@/actions/plantings';
import { BackButton } from '@/components/back-button';
import { MultiSelect } from "@/components/multi-select";
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlantingFormValues, plantingSchema } from '@/validations/plantings';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Plot } from '~/lib/generated/prisma-client';

export default function CreatePlantingPage() {
  const [farms, setFarms] = useState<any[]>([]);
  const [varieties, setVarieties] = useState<any[]>([]);
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
      varieties: [],
      population: 0,
      plantingDate: '',
      farmId: 0,
      plotIds: [],
    },
  });

  const onSubmit = async (data: PlantingFormValues) => {
    const formData = new FormData();
    formData.append('crop', data.crop);
    data.varieties.forEach(variety => formData.append('varieties', variety));
    formData.append('population', data.population.toString());
    formData.append('plantingDate', data.plantingDate);
    formData.append('farmId', data.farmId.toString());
    
    data.plotIds.forEach(id => formData.append('plotIds', id.toString()));

    await createPlanting(formData);
  };

  useEffect(() => {
    async function fetchData() {
      const [farmsData, varietiesData] = await Promise.all([
        getFarmsWithPlots(),
        fetch('/api/varieties').then(res => res.json())
      ]);
      setFarms(farmsData);
      setVarieties(varietiesData);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Cadastrar Plantio</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label className='mb-2' htmlFor="farmId">Fazenda</Label>
          <select 
            id="farmId" 
            {...form.register('farmId')}
            required 
            onChange={(e) => {
              const farmId = parseInt(e.target.value);
              form.setValue('farmId', farmId);
              handleFarmChange(e);
            }}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option value="">Selecione uma Fazenda</option>
            {farms.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.name}
              </option>
            ))}
          </select>
          {form.formState.errors.farmId && <p className="text-red-500 text-sm mt-1">{form.formState.errors.farmId.message}</p>}
        </div>
        
          <Controller
            control={form.control}
            name="plotIds"
            render={({ field }) => (
            <div>
              <Label className='mb-2'>Talhões</Label>
              <MultiSelect
                options={selectedFarm?.plots.map((plot: any) => ({ label: `${plot.name.toLocaleUpperCase()} (${plot.area} ha)`, value: plot.id.toString() })) || []}
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
          <Input 
            id="crop" 
            {...form.register('crop')}
            type="text" 
            placeholder="Ex: Soja" 
            required 
          />
          {form.formState.errors.crop && <p className="text-red-500 text-sm mt-1">{form.formState.errors.crop.message}</p>}
        </div>
        
        <Controller
          control={form.control}
          name="varieties"
          render={({ field }) => (
            <div>
              <Label className='mb-2'>Variedades</Label>
              <MultiSelect
                options={varieties.map((variety: any) => ({ 
                  label: `${variety.name.toUpperCase()} (${variety.cycle} dias)`, 
                  value: variety.name 
                }))}
                value={field.value}
                onValueChange={(values) => field.onChange(values)}
                placeholder="Selecione uma ou mais variedades..."
              />
              {form.formState.errors.varieties && <p className="text-red-500 text-sm mt-1">{form.formState.errors.varieties.message}</p>}
            </div>
          )}
        />
        
        <div>
          <Label className='mb-2' htmlFor="population">População</Label>
          <Input 
            id="population" 
            {...form.register('population')}
            type="number" 
            step="1" 
            placeholder="Ex: 250000" 
            required 
          />
          {form.formState.errors.population && <p className="text-red-500 text-sm mt-1">{form.formState.errors.population.message}</p>}
        </div>
        <div>
          <Label className='mb-2' htmlFor="plantingDate">Data do Plantio</Label>
          <Input 
            id="plantingDate" 
            {...form.register('plantingDate')}
            type="date" 
            required 
          />
          {form.formState.errors.plantingDate && <p className="text-red-500 text-sm mt-1">{form.formState.errors.plantingDate.message}</p>}
        </div>

         <div className='flex justify-between'>
            <BackButton />  
            <SubmitButton />
          </div>
      </form>
    </div>
  );
}