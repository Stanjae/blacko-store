import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {theme} from '@/utils/theme'
import "./globals.css";
import { CounterStoreProvider } from "./providers/storeProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blacko Eccomerce Store",
  description: "Shopping Services",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="_next" className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
      <StyledEngineProvider injectFirst>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme} noSsr disableTransitionOnChange>
            <CssBaseline/>
            <CounterStoreProvider>{children}</CounterStoreProvider>
            <Toaster richColors/>
          </ThemeProvider>
        </AppRouterCacheProvider>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
