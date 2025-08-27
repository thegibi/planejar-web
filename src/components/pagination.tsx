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

  return (
    <div className="flex justify-center items-center space-x-2">
      <Link href={createPageURL(currentPage - 1)} passHref>
        <Button variant="outline" size="icon" disabled={currentPage <= 1}>
          <FaChevronLeft className="h-4 w-4" />
        </Button>
      </Link>

      <div className="flex space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link key={page} href={createPageURL(page)} passHref>
            <Button
              variant={currentPage === page ? 'default' : 'outline'}
              size="icon"
            >
              {page}
            </Button>
          </Link>
        ))}
      </div>

      <Link href={createPageURL(currentPage + 1)} passHref>
        <Button variant="outline" size="icon" disabled={currentPage >= totalPages}>
          <FaChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}