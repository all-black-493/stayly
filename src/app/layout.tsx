import '../lib/orpc.server'
import type { Metadata } from "next";
import { Outfit, Alegreya, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { Providers } from "@/providers";

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Alegreya({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Stayly",
  description: "Discover the best guest house rooms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers> 
            <TooltipProvider>
              <NuqsAdapter>
                {children}
              </NuqsAdapter>
              <Toaster />
            </TooltipProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}