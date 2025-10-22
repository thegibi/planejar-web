'use client';

import { createApplication, getAllInputs, getFarmDetails } from '@/actions/application';
import { BackButton } from '@/components/back-button';
import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  sprayTank: string | null;
  fertilizerSpreader: string | null;
  owner: {
    name: string;
  };
  plantings: {
    id: number;
    crop: string;
    varieties: string[];
    population: number;
    plantingDate: Date;
    varietiesWithCycles?: {
      name: string;
      cycle: number | null;
    }[];
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
}

interface InputData {
  id: number;
  class: string;
  commercialBrand: string;
  activeIngredient: string;
  unitOfMeasure: string;
}

export default function CreateApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const farmId = parseInt(params.id as string);
  
  const [preSelectedPlantingId, setPreSelectedPlantingId] = useState<number | null>(null);
  
  const [farm, setFarm] = useState<FarmDetails | null>(null);
  const [allInputs, setAllInputs] = useState<InputData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<ApplicationFormData>({
    plantingId: '',
    applicationDate: '',
    plotIds: [],
    inputIds: [],
    flowRate: '',
    rowSpacing: ''
  });

  const [selectedPlanting, setSelectedPlanting] = useState<number | null>(null);
  const [selectedPlantingData, setSelectedPlantingData] = useState<FarmDetails['plantings'][0] | null>(null);
  const [availablePlots, setAvailablePlots] = useState<{id: number, name: string, area: number}[]>([]);
  const [calculatedArea, setCalculatedArea] = useState<string>('');
  const [selectedInputClass, setSelectedInputClass] = useState<string>('');

  const getUniqueInputClasses = (): string[] => {
    if (!allInputs.length) return [];
    const classes = allInputs.map((input: InputData) => input.class);
    return Array.from(new Set(classes)).sort();
  };

  const getFilteredInputs = (): InputData[] => {
    if (!allInputs.length) return [];
    if (!selectedInputClass) return allInputs;
    return allInputs.filter((input: InputData) => input.class === selectedInputClass);
  };

  const getInputOptions = () => {
    return getFilteredInputs().map((input) => ({
      label: `${input.commercialBrand} - ${input.activeIngredient} (${input.unitOfMeasure})`,
      value: input.id.toString()
    }));
  };

  const calculateAreaFromTankAndFlow = (tankCapacity: string, flowRate: string) => {
    const tank = parseFloat(tankCapacity);
    const flow = parseFloat(flowRate);
    
    if (tank > 0 && flow > 0) {
      const area = tank / flow;
      return area.toFixed(2);
    }
    return '';
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const plantingId = urlParams.get('plantingId');
      if (plantingId) {
        setPreSelectedPlantingId(parseInt(plantingId));
      }
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [farmDetails, inputs] = await Promise.all([
          getFarmDetails(farmId),
          getAllInputs()
        ]);
        
        if (farmDetails) {
          setFarm(farmDetails);
        }
        
        setAllInputs(inputs);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    if (farmId) {
      loadData();
    }
  }, [farmId]);

  useEffect(() => {
    if (farm && preSelectedPlantingId) {
      const plantingExists = farm.plantings.find(p => p.id === preSelectedPlantingId);
      if (plantingExists) {
        setSelectedPlanting(preSelectedPlantingId);
        setFormData(prev => ({ ...prev, plantingId: preSelectedPlantingId.toString() }));
      }
    }
  }, [farm, preSelectedPlantingId]);

  useEffect(() => {
    if (selectedPlanting && farm) {
      const planting = farm.plantings.find(p => p.id === selectedPlanting);
      if (planting) {
        setSelectedPlantingData(planting);
        setAvailablePlots(planting.plots);
        // Automaticamente selecionar todos os plots do planting
        const allPlotIds = planting.plots.map(plot => plot.id.toString());
        setFormData(prev => ({ ...prev, plotIds: allPlotIds }));
      }
    } else {
      setSelectedPlantingData(null);
      setAvailablePlots([]);
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
        router.push(`/applications/list`);
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
            <CardDescription>
              Dados gerais da fazenda onde a aplicação será realizada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around space-y-4">
             <div>
               <div>
                <strong>Nome:</strong> {farm.name}
              </div>
              <div>
                <strong>Proprietário:</strong> {farm.owner.name}
              </div>
             </div>
             <div>
               <div>
                <strong>Localização:</strong> {farm.location}
              </div>
              <div>
                <strong>Área Total:</strong> {farm.area} ha
              </div>
             </div>
             <div>
               <div>
                <strong>Tanque de Pulverização:</strong> {farm.sprayTank || 'N/A'}
              </div>
              <div>
                <strong>Distribuidor de Adubo:</strong> {farm.fertilizerSpreader || 'N/A'}
              </div>
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
              <div>
                <Label htmlFor="planting" className="mb-2">Plantio *</Label>
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

              {selectedPlantingData && (
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Informações do Plantio Selecionado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <strong className="text-green-700">Cultura:</strong>
                        <div className="text-green-600 font-medium">{selectedPlantingData.crop}</div>
                      </div>
                      <div>
                        <strong className="text-green-700">Data do Plantio:</strong>
                        <div className="text-green-600 font-medium">
                          {selectedPlantingData.plantingDate.toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                      <div>
                        <strong className="text-green-700">População:</strong>
                        <div className="text-green-600 font-medium">
                          {selectedPlantingData.population.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <strong className="text-green-700">Área:</strong>
                        <div className="text-green-600 font-medium">
                          {selectedPlantingData.plots.reduce((sum, plot) => sum + plot.area, 0)} ha
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <strong className="text-green-700">Variedades:</strong>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedPlantingData.varietiesWithCycles?.map((variety, index) => (
                          <span 
                            key={index} 
                            className="bg-green-100 border border-green-300 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {variety.name}
                            {variety.cycle && (
                              <span className="text-green-600"> ({variety.cycle} dias)</span>
                            )}
                          </span>
                        )) || selectedPlantingData.varieties.map((variety, index) => (
                          <span 
                            key={index} 
                            className="bg-green-100 border border-green-300 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {variety}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Seleção de Talhões */}
              {selectedPlantingData && (
                <div>
                  <Label className="mb-2">Talhões da Fazenda *</Label>
                  <MultiSelect
                    options={farm.plots.map((plot) => ({
                      label: `${plot.name} (${plot.area} ha)`,
                      value: plot.id.toString()
                    }))}
                    value={formData.plotIds}
                    onValueChange={(newValues) => {
                      setFormData(prev => ({ ...prev, plotIds: newValues }));
                    }}
                    placeholder="Selecione os talhões"
                  />
                  {formData.plotIds.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Área total selecionada:</strong>{' '}
                      {farm.plots
                        .filter((plot) => formData.plotIds.includes(plot.id.toString()))
                        .reduce((sum, plot) => sum + plot.area, 0)
                        .toFixed(2)}{' '}
                      ha
                    </div>
                  )}
                </div>
              )}

              {/* Data da Aplicação */}
              <div>
                <Label htmlFor="applicationDate" className="mb-2">Data da Aplicação *</Label>
                <Input
                  id="applicationDate"
                  type="date"
                  value={formData.applicationDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, applicationDate: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label>Insumos a serem Aplicados *</Label>
                
                {/* Filtro por Classe */}
                <div className="mt-2 mb-3">
                  <Label htmlFor="inputClassFilter" className="text-sm text-gray-600">Filtrar por Classe:</Label>
                  <select
                    id="inputClassFilter"
                    value={selectedInputClass}
                    onChange={(e) => setSelectedInputClass(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                  >
                    <option value="">Escolha a classe</option>
                    {getUniqueInputClasses().map((inputClass) => (
                      <option key={inputClass} value={inputClass}>
                        {inputClass}
                      </option>
                    ))}
                  </select>
                </div>

                {/* MultiSelect de Insumos */}
                {selectedInputClass && (
                  <div className="mt-3">
                    <Label className="text-sm text-gray-600 mb-2 block">
                      Selecione os Insumos da classe &quot;{selectedInputClass}&quot;:
                    </Label>
                    <MultiSelect
                      options={getInputOptions()}
                      value={formData.inputIds}
                      onValueChange={(newValues) => {
                        setFormData(prev => ({ ...prev, inputIds: newValues }));
                      }}
                      placeholder="Selecione os insumos..."
                    />
                  </div>
                )}

                {!selectedInputClass && (
                  <div className="text-gray-500 text-sm p-4 text-center border rounded mt-3">
                    Selecione uma classe para visualizar os insumos disponíveis
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="rowSpacing" className='mb-2'>Espaço entre Linhas (m)</Label>
                  <Input
                    id="rowSpacing"
                    type="number"
                    step="0.01"
                    value={formData.rowSpacing}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, rowSpacing: e.target.value }))}
                    placeholder="Espaço entre linhas em metros (opcional)"
                  />
                </div>
                <div>
                  <Label htmlFor="flowRate" className='mb-2'>Vazão (L/ha)</Label>
                  <Input
                    id="flowRate"
                    type="number"
                    step="0.1"
                    value={formData.flowRate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newFlowRate = e.target.value;
                      setFormData(prev => ({ ...prev, flowRate: newFlowRate }));
                      
                      if (farm?.sprayTank && newFlowRate) {
                        const calculated = calculateAreaFromTankAndFlow(farm.sprayTank, newFlowRate);
                        setCalculatedArea(calculated);
                      } else {
                        setCalculatedArea('');
                      }
                    }}
                    placeholder="Vazão em litros por hectare (opcional)"
                  />
                </div>
                <div>
                  <Label htmlFor="calculatedArea" className='mb-2'>Área por Tanque (ha)</Label>
                  <Input
                    id="calculatedArea"
                    type="text"
                    value={calculatedArea}
                    readOnly
                    placeholder="Área calculada automaticamente"
                    className="bg-gray-50 text-gray-700"
                  />
                  {farm?.sprayTank && (
                    <p className="text-xs text-gray-500 mt-1">
                      Tanque: {farm.sprayTank}L
                    </p>
                  )}
                </div>
              </div>

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