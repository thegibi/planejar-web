'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaAngleDoubleLeft, FaDashcube, FaDna, FaFlask, FaMapMarkerAlt, FaSeedling, FaSignOutAlt, FaTractor, FaUser } from 'react-icons/fa';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
   isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isCollapsed, isActive}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Link href={href} className={cn("flex items-center w-full p-2 rounded-md transition-colors hover:bg-transparent", 
        !isCollapsed && "hover:bg-gray-100")}>
        <div className={cn("flex items-center justify-center", isActive ? "text-green-600" : "text-gray-600")}>
          {icon}
        </div>
        <span className={cn("ml-4 whitespace-nowrap overflow-hidden transition-all", 
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100", 
          isActive ? "font-semibold text-green-600" : "text-gray-600")}>
          {label}
        </span>
      </Link>
    </TooltipTrigger>
    <TooltipContent 
      side="right" 
      hidden={!isCollapsed}
      className="bg-green-600 text-white"
      arrowClassName="bg-green-600 fill-green-600"
    >
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: session, status } = useSession();
  const sidebarWidth = isCollapsed ? 'w-[70px]' : 'w-[256px]';
  const paddingLeft = isCollapsed ? 'pl-[94px]' : 'pl-[280px]';

  const handleLogout = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  return (
    <div className="flex">
      <aside className={cn("bg-white shadow-sm flex flex-col fixed top-0 left-0 h-full p-4 transition-all duration-300", sidebarWidth)}>
        <div className="flex justify-end mb-4">
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
            <FaAngleDoubleLeft className={cn("h-5 w-5 transition-transform", isCollapsed ? "rotate-180" : "rotate-0")} />
          </Button>
        </div>
        
        <nav className="flex flex-col space-y-2">
          <NavItem
            href="/dashboard"
            icon={<FaDashcube className="h-5 w-5" />}
            label="Visão Geral"
            isCollapsed={isCollapsed}
            isActive={pathname === "/dashboard"}
          />
          <NavItem
            href="/clients/list"
            icon={<FaUser className="h-5 w-5" />}
            label="Clientes"
            isCollapsed={isCollapsed}
            isActive={pathname === "/clients/list"}
          />
          <NavItem
            href="/farms/list"
            icon={<FaTractor className="h-5 w-5" />}
            label="Fazendas"
            isCollapsed={isCollapsed}
            isActive={pathname === "/farms/list"}
          />
          <NavItem
            href="/plots/list"
            icon={<FaMapMarkerAlt className="h-5 w-5" />}
            label="Talhões"
            isCollapsed={isCollapsed}
            isActive={pathname === "/plots/list"}
          />
          <NavItem
            href="/inputs/list"
            icon={<FaFlask className="h-5 w-5" />}
            label="Insumos"
            isCollapsed={isCollapsed}
            isActive={pathname === "/inputs/list"}
          />
          <NavItem
            href="/varieties/list"
            icon={<FaDna className="h-5 w-5" />}
            label="Variedades"
            isCollapsed={isCollapsed}
            isActive={pathname === "/varieties/list"}
          />
          <NavItem
            href="/plantings/list"
            icon={<FaSeedling className="h-5 w-5" />}
            label="Plantios"
            isCollapsed={isCollapsed}
            isActive={pathname === "/plantings/list"}
          />
        </nav>

        {/* Informações do usuário e logout */}
        <div className="mt-auto">
          {session?.user && (
            <div className="border-t pt-4">
              {!isCollapsed && (
                <div className="mb-2 px-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {session.user.email}
                  </p>
                </div>
              )}
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size={isCollapsed ? "icon" : "sm"}
                    className={cn(
                      "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                      isCollapsed && "justify-center"
                    )}
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="h-4 w-4" />
                    {!isCollapsed && <span className="ml-2">Sair</span>}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" hidden={!isCollapsed} className="bg-green-600 text-white" arrowClassName="bg-green-600 fill-green-600">
                  <p>Sair</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className={cn("flex-1 transition-all duration-300 pr-6", paddingLeft)}>
        {children}
      </main>
    </div>
  );
}