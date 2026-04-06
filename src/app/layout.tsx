import type { Metadata } from "next";
import { Inter, Noto_Serif, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "greek"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin", "greek"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kapernaros Beauty Consulting",
  description: "Strategic consulting and elite recruitment for the world's most prestigious beauty institutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="el"
      className={`${inter.variable} ${notoSerif.variable} ${playfairDisplay.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-body selection:bg-primary selection:text-on-primary">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
