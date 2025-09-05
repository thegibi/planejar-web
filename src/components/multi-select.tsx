'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({ options, value, onValueChange, placeholder }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = (item: string) => {
    onValueChange(value.filter((i) => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          onClick={() => setOpen(!open)}
        >
          {value.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {value.map((item) => {
                const option = options.find((o) => o.value === item);
                if (!option) return null;
                return (
                  <Badge key={item} variant="secondary" onClick={() => handleUnselect(item)}>
                    {option.label}
                    <span className="ml-1 text-xs text-gray-400">×</span>
                  </Badge>
                );
              })}
            </div>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
          <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  const newValue = value.includes(option.value)
                    ? value.filter((v) => v !== option.value)
                    : [...value, option.value];
                  onValueChange(newValue);
                  setInputValue('');
                }}
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value.includes(option.value) ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}