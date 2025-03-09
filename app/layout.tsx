import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/providers/Providers";
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
  title: "HypeBio - Générateur Automatique de Bios Virales",
  description: "Générez des bios optimisées pour TikTok, Instagram, Twitter, LinkedIn et OnlyFans en quelques clics.",
  keywords: "bio generator, bios virales, tiktok bio, instagram bio, twitter bio, linkedin bio, onlyfans bio",
  authors: [{ name: "HypeBio Team" }],
  creator: "HypeBio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
