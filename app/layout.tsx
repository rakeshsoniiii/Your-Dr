import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "YOUR DR. — Medicine & Product Safety Scanner",
  description:
    "Scan any medicine or product to know if it's safe. Get side effects, health ratings, and smart advice instantly. By Rakesh Soni.",
  keywords: "medicine scanner, product safety, side effects, health check, AI",
  authors: [{ name: "Rakesh Soni" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-dvh flex flex-col antialiased font-[var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
