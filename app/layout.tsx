import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/styles/fonts";

export const metadata: Metadata = {
  title: {
    default: "Chromaland Developers - Smart Luxury Terraces in Abuja",
    template: "%s - Chromaland Developers",
  },
  description:
    "Discover Plot 610 Terraces by Chromaland Developers in Daki Biyu, Abuja - elegant, tech-enabled living crafted for modern lifestyles.",
  keywords: [
    "Chromaland Developers",
    "Plot 610 Terraces",
    "real estate Abuja",
    "smart homes Nigeria",
  ],
  openGraph: {
    title: "Chromaland Developers - Smart Luxury Terraces in Abuja",
    description:
      "Plot 610 Terraces by Chromaland Developers blends smart convenience with refined comfort in Daki Biyu, Abuja.",
    type: "website",
    locale: "en_US",
    url: "https://chromaland.example.com",
    siteName: "Chromaland Developers",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Chromaland Developers - Smart Terraces in Abuja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chromaland Developers - Smart Luxury Terraces in Abuja",
    description:
      "Elegantly crafted terraces in Daki Biyu, Abuja with smart-home conveniences and generous spaces.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${fontVariables} bg-white text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
