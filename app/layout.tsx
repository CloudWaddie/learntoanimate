import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--type-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", variable: "--type-mono" });

export const metadata: Metadata = {
  title: "Learn to Animate",
  description:
    "A practical course in web animation with CSS and Motion for React.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
