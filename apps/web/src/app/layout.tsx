import type { Metadata } from "next";
import { Inter, JetBrains_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Evolith — The Living Atlas of Human Knowledge",
  description:
    "Explore how technology evolves. Trace the origins, connections, and future of every breakthrough in human innovation.",
  keywords: [
    "knowledge graph",
    "technology evolution",
    "research platform",
    "AI",
    "scientific discovery",
    "innovation atlas",
    "knowledge OS",
  ],
  openGraph: {
    title: "Evolith",
    description: "The Living Atlas of Human Knowledge",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
