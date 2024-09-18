import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavLinks } from "@/components/NavLinks";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Middleware Practice",
  description: "Middleware Practice For Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Add Our UI Links To The Header */}
        <NavLinks />
        {children}
      </body>
    </html>
  );
}
