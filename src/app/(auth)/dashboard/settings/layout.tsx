import Link from "next/link";
import React from "react";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-300">
      {/* Add Our UI Links To The Header */}
      <nav className="flex items-center justify-between p-4 bg-blue-600">
        <h1 className="text-3xl font-bold">Inside Settings Layout</h1>
        <ul className="flex gap-4">
          <li>
            <Link href="/dashboard/settings">Settings</Link>
          </li>
          <li>
            <Link href="/dashboard/settings/password">password</Link>
          </li>
          <li>
            <Link href="/dashboard/settings/profile">profile</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
