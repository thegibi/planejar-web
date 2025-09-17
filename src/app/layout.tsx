import { MainLayout } from "@/components/main-layout";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Planejar - Consultoria Agrícola",
    template: "%s | Planejar",
  },
  description: "Planejar - Consultoria Agrícola",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <TooltipProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </TooltipProvider>
          <Analytics />
      </body>
    </html>
  );
}
