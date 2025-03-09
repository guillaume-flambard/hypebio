import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HypeBio - Générateur de bio IA pour réseaux sociaux",
  description: "Créez la bio parfaite pour vos réseaux sociaux avec l'aide de l'intelligence artificielle",
  authors: [{ name: "HypeBio Team" }],
  keywords: "bio generator, instagram bio, twitter bio, linkedin bio, ia, ai, réseaux sociaux, social media",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
