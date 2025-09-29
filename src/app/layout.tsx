import { ConditionalLayout } from "@/components/conditional-layout";
import SessionProvider from "@/components/providers/session-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        <SessionProvider>
          <TooltipProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </TooltipProvider>
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
