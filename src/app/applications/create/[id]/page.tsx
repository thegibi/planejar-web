'use client';

import { createApplication, getFarmDetails } from '@/actions/application';
import { BackButton } from '@/components/back-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ApplicationFormData } from '@/validations/application';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface FarmDetails {
  id: number;
  name: string;
  location: string;
  area: number;
  owner: {
    name: string;
  };
  plantings: {
    id: number;
    crop: string;
    varieties: string[];
    plantingDate: Date;
    plots: {
      id: number;
      name: string;
      area: number;
    }[];
  }[];
  plots: {
    id: number;
    name: string;
    area: number;
  }[];
  inputs: {
    id: number;
    class: string;
    commercialBrand: string;
    activeIngredient: string;
    unitOfMeasure: string;
  }[];
}

export default function CreateApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const farmId = parseInt(params.id as string);
  
  const [farm, setFarm] = useState<FarmDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<ApplicationFormData>({
    plantingId: '',
    applicationDate: '',
    plotIds: [],
    inputIds: [],
    observations: ''
  });

  const [selectedPlanting, setSelectedPlanting] = useState<number | null>(null);
  const [availablePlots, setAvailablePlots] = useState<{id: number, name: string, area: number}[]>([]);

  useEffect(() => {
    const loadFarmDetails = async () => {
      try {
        const farmDetails = await getFarmDetails(farmId);
        if (farmDetails) {
          setFarm(farmDetails);
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes da fazenda:', error);
        toast.error('Erro ao carregar dados da fazenda');
      } finally {
        setLoading(false);
      }
    };

    if (farmId) {
      loadFarmDetails();
    }
  }, [farmId]);

  useEffect(() => {
    if (selectedPlanting && farm) {
      const planting = farm.plantings.find(p => p.id === selectedPlanting);
      if (planting) {
        setAvailablePlots(planting.plots);
        setFormData(prev => ({ ...prev, plotIds: [] }));
      }
    }
  }, [selectedPlanting, farm]);

  const handlePlantingChange = (plantingId: string) => {
    setFormData(prev => ({ ...prev, plantingId }));
    setSelectedPlanting(parseInt(plantingId));
  };

  const handlePlotToggle = (plotId: string) => {
    setFormData(prev => ({
      ...prev,
      plotIds: prev.plotIds.includes(plotId)
        ? prev.plotIds.filter(id => id !== plotId)
        : [...prev.plotIds, plotId]
    }));
  };

  const handleInputToggle = (inputId: string) => {
    setFormData(prev => ({
      ...prev,
      inputIds: prev.inputIds.includes(inputId)
        ? prev.inputIds.filter(id => id !== inputId)
        : [...prev.inputIds, inputId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const result = await createApplication(formData);
      
      if (result.success) {
        toast.success(result.message);
        router.push(`/farms/details/${farmId}`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Erro ao criar aplicação:', error);
      toast.error('Erro ao cadastrar aplicação');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto mt-10 p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!farm) {
    return (
      <div className="container mx-auto mt-10 p-4">
        <div className="text-center text-red-500">Fazenda não encontrada.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-medium text-gray-900">
          Cadastrar Aplicação:  {' '}
          <span className='font-bold text-green-600'>{farm.name}</span>
        </h1>
        <BackButton />
      </div>

      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Fazenda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <strong>Nome:</strong> {farm.name}
              </div>
              <div>
                <strong>Proprietário:</strong> {farm.owner.name}
              </div>
              <div>
                <strong>Localização:</strong> {farm.location}
              </div>
              <div>
                <strong>Área Total:</strong> {farm.area} ha
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulário */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Dados da Aplicação</CardTitle>
            <CardDescription>
              Preencha os dados para cadastrar uma nova aplicação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Seleção do Plantio */}
              <div>
                <Label htmlFor="planting">Plantio *</Label>
                <select
                  id="planting"
                  value={formData.plantingId}
                  onChange={(e) => handlePlantingChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Selecione um plantio</option>
                  {farm.plantings.map((planting) => (
                    <option key={planting.id} value={planting.id}>
                      {planting.crop} - {planting.varieties.join(', ')} 
                      ({planting.plantingDate.toLocaleDateString('pt-BR')})
                    </option>
                  ))}
                </select>
              </div>

              {/* Data da Aplicação */}
              <div>
                <Label htmlFor="applicationDate">Data da Aplicação *</Label>
                <Input
                  id="applicationDate"
                  type="date"
                  value={formData.applicationDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, applicationDate: e.target.value }))}
                  required
                />
              </div>

              {/* Seleção dos Talhões */}
              {availablePlots.length > 0 && (
                <div>
                  <Label>Talhões para Aplicação *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {availablePlots.map((plot) => (
                      <label
                        key={plot.id}
                        className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={formData.plotIds.includes(plot.id.toString())}
                          onChange={() => handlePlotToggle(plot.id.toString())}
                          className="text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm">
                          {plot.name} ({plot.area} ha)
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Seleção dos Insumos */}
              <div>
                <Label>Insumos a serem Aplicados *</Label>
                <div className="space-y-2 mt-2 max-h-60 overflow-y-auto border rounded p-2">
                  {farm.inputs.map((input) => (
                    <label
                      key={input.id}
                      className="flex items-start space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.inputIds.includes(input.id.toString())}
                        onChange={() => handleInputToggle(input.id.toString())}
                        className="text-green-600 focus:ring-green-500 mt-1"
                      />
                      <div className="text-sm">
                        <div className="font-medium">{input.commercialBrand}</div>
                        <div className="text-gray-600">
                          {input.activeIngredient} - {input.class}
                        </div>
                        <div className="text-gray-500">{input.unitOfMeasure}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Observações */}
              <div>
                <Label htmlFor="observations">Observações</Label>
                <Textarea
                  id="observations"
                  value={formData.observations}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                  placeholder="Observações sobre a aplicação (opcional)"
                  rows={3}
                />
              </div>

              {/* Botões */}
              <div className="flex justify-between gap-3 pt-6">
                <Link href={`/farms/details/${farmId}`}>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex"
                >
                  {submitting ? 'Cadastrando...' : 'Cadastrar Aplicação'}
                </Button>
                
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}