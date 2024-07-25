import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Nav from "./components/Nav";

import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Cyscom Recruitments",
  description: "Recruitment portal for Cyscom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <Nav />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
