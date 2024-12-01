import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { EdgeStoreProvider } from '../lib/edgestore';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skin Clarify",
  description: "A Chatbot for Diagnosing Skin Diseases Through Text and Image Analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </body>
    </html>
  );
}
