'use client';

import { MainLayout } from "@/components/main-layout";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const publicRoutes = ['/', '/auth/signin', '/auth/signup'];
  
  if (status === 'loading') {
    return <>{children}</>;
  }

  if (publicRoutes.includes(pathname) || !session) {
    return <>{children}</>;
  }

  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}