import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CYSCOM Recruitments",
  description: "Recruitment portal for CYSCOM",
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
          "flex flex-col min-h-screen bg-background font-sans antialiased bg-white",
          fontSans.variable,
        )}
      >
        <Providers>
          <Nav />
          <div className="grow">{children}</div>
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
