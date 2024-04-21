import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/toast-provider";

const manrope = Manrope({subsets: ['latin']})

export const metadata: Metadata = {
  title: "Elegant",
  description: "A E-commerce store is a collection of products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        {children}
        <ToastProvider/>
      </body>
    </html>
  );
}
