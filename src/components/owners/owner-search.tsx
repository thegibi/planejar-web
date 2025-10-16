'use client';

import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export function OwnerSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const handleSearch = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1'); // Reset para primeira página ao buscar
    
    if (term.trim()) {
      params.set('search', term.trim());
    } else {
      params.delete('search');
    }
    
    const newUrl = `${pathname}?${params.toString()}`;
    replace(newUrl);
  }, [searchParams, pathname, replace]);

  // Debounce para evitar muitas chamadas
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, handleSearch]);

  return (
    <div className="relative w-full max-w-6/12">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className={`h-4 w-4 transition-colors ${isFocused ? 'text-green-600' : 'text-gray-400'}`} />
      </div>
      <Input
        className="pl-10 w-full"
        placeholder="Buscar por nome ou email do proprietário..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}