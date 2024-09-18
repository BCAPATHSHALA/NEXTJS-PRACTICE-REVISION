import Link from "next/link";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-600">
      {/* Add Our UI Links To The Header */}
      <nav className="flex items-center justify-between p-4 bg-green-600">
        <h1 className="text-3xl font-bold">Inside Blog Layout</h1>
        <ul className="flex gap-4">
          <li>
            <Link href="/blog">All Blogs</Link>
          </li>
          <li>
            <Link href="/blog/slug1">Blog 1</Link>
          </li>
          <li>
            <Link href="/blog/slug2">Blog 2</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
