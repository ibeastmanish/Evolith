import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Anti Gravity — Where AI Meets Fundamental Physics",
  description:
    "An open research platform connecting the mathematics behind the universe. Import papers, build knowledge graphs, and generate evidence-backed hypotheses.",
  keywords: [
    "physics",
    "AI",
    "research",
    "scientific discovery",
    "knowledge graph",
    "hypothesis generation",
    "quantum mechanics",
    "general relativity",
  ],
  openGraph: {
    title: "Anti Gravity",
    description: "Where AI Meets Fundamental Physics",
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
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
