import React from "react";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-300">
      <h1>PASSWORD LAYOUT</h1>
      {children}
    </div>
  );
}
