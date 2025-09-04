import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          <Image
            src="/planejar-logo.png"
            alt="Logo"
            width={300}
            height={300}
          />
        </Link>

        <nav className="flex items-center space-x-4">
          <Link href="/clients/list">
            <Button variant="ghost">Clientes</Button>
          </Link>
          <Link href="/farms/list">
            <Button variant="ghost">Fazendas</Button>
          </Link>
          <Link href="/plots/list">
            <Button variant="ghost">Talhões</Button>
          </Link>
          <Link href="/inputs/list">
            <Button variant="ghost">Insumos</Button>
          </Link>
          {/* <Link href="/plantings/list">
            <Button variant="ghost">Plantios</Button>
          </Link> */}
        </nav>
      </div>
    </header>
  );
}