'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 7) {
      // Se temos 7 ou menos páginas, mostra todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Link key={i} href={createPageURL(i)} passHref>
            <Button
              variant={currentPage === i ? 'default' : 'outline'}
              size="icon"
            >
              {i}
            </Button>
          </Link>
        );
      }
    } else {
      // Mostra os 3 primeiros
      for (let i = 1; i <= 3; i++) {
        pages.push(
          <Link key={i} href={createPageURL(i)} passHref>
            <Button
              variant={currentPage === i ? 'default' : 'outline'}
              size="icon"
            >
              {i}
            </Button>
          </Link>
        );
      }

      // Adiciona três pontinhos
      pages.push(
        <span key="ellipsis" className="px-2 py-2 text-gray-500">
          ...
        </span>
      );

      // Mostra os 3 últimos
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pages.push(
          <Link key={i} href={createPageURL(i)} passHref>
            <Button
              variant={currentPage === i ? 'default' : 'outline'}
              size="icon"
            >
              {i}
            </Button>
          </Link>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <Link href={createPageURL(currentPage - 1)} passHref>
        <Button variant="outline" size="icon" disabled={currentPage <= 1}>
          <FaChevronLeft className="h-4 w-4" />
        </Button>
      </Link>

      <div className="flex space-x-1 items-center">
        {renderPageNumbers()}
      </div>

      <Link href={createPageURL(currentPage + 1)} passHref>
        <Button variant="outline" size="icon" disabled={currentPage >= totalPages}>
          <FaChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}