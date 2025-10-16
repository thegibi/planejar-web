'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

interface InputClassFilterProps {
  availableClasses: { class: string }[];
}

export function InputClassFilter({ availableClasses }: InputClassFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentClass = searchParams.get('class') || '';

  const handleClassChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === 'all') {
      params.delete('class');
    } else {
      params.set('class', value);
    }
    
    params.delete('page');
    
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-48">
      <Select value={currentClass || 'all'} onValueChange={handleClassChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por classe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as classes</SelectItem>
          {availableClasses.map((item) => (
            <SelectItem key={item.class} value={item.class}>
              {item.class}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}