import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = localFont({
  src: [
    {
      path: "../public/fonts/semplicitapro-light-webfont.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/semplicitapro-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/semplicitapro-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/semplicitapro-semibold-webfont.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/semplicitapro-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-semplicitapro",
});

export const metadata: Metadata = {
  title: "Easymed",
  description: "An easy to use medical app",
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
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
