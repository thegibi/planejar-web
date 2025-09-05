'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaFlask, FaMapMarkerAlt, FaSeedling, FaTractor, FaUser } from 'react-icons/fa';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, onClick }) => (
  <Tooltip>
  <TooltipTrigger asChild >
  <Link href= { href } onClick = { onClick } >
    <Button variant="ghost" size = "icon" className = "h-10 w-10" >
      { icon }
      </Button>
      </Link>
      </TooltipTrigger>
      < TooltipContent side = "right" >
        <p>{ label } </p>
        </TooltipContent>
        </Tooltip>
);

export function SideMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className= "fixed top-4 left-4 z-50" >
    <Drawer open={ open } onOpenChange = { setOpen } >
      <DrawerTrigger asChild >
      <Button variant="outline" size = "icon" >
        <FaBars className="h-5 w-5" />
          </Button>
          </DrawerTrigger>
          <DrawerContent side="left" className="w-64 p-4 flex flex-col items-start space-y-4">
            <h2 className="text-xl font-bold mb-4"> Menu </h2>

              <NavItem
  href="/clients"
  icon={<FaUser className="h-4 w-4" />}
  label="Clientes"
  onClick={() => setOpen(false)}
/>
  <NavItem
  href="/farms"
  icon={<FaTractor className="h-4 w-4" />}
  label="Fazendas"
  onClick={() => setOpen(false)}
  />
  <NavItem
  href="/plots"
  icon={<FaMapMarkerAlt className="h-4 w-4" />}
  label="Talhões"
  onClick={() => setOpen(false)}
  />
  <NavItem
  href="/inputs"
  icon={<FaFlask className="h-4 w-4" />}
  label="Insumos"
  onClick={() => setOpen(false)}
  />
  <NavItem
  href="/plantings"
  icon={<FaSeedling className="h-4 w-4" />}
  label="Plantios"
  onClick={() => setOpen(false)}
/>
  </DrawerContent>
  </Drawer>
  </div>
  );
}