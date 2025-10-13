'use client';

import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function FarmSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // Reset para primeira página ao buscar
    
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    
    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, replace]);

  return (
    <div className="relative w-full max-w-6/12">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className={`h-4 w-4 transition-colors ${isFocused ? 'text-green-600' : 'text-gray-400'}`} />
      </div>
      <Input
        className="pl-10 w-full"
        placeholder="Buscar por nome da fazenda ou proprietário..."
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        defaultValue={searchParams.get('search')?.toString()}
      />
    </div>
  );
}