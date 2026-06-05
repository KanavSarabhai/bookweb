import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shroff Publishers and Distributors | Technical Books",
    template: "%s | Shroff Publishers",
  },
  description:
    "India's trusted distributor of technical books in programming, AI, data science, cybersecurity, engineering, and business from O'Reilly, Pragmatic, and leading publishers.",
  keywords: [
    "technical books",
    "programming books",
    "O'Reilly India",
    "Shroff Publishers",
    "computer science books",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${inter.variable} min-h-screen flex flex-col antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brown focus:text-ivory font-ui text-sm rounded-sm"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
