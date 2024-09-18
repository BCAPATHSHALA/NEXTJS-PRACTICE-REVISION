import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-sky-600">
        <h2>INSIDE ADMIN</h2>
        <Link href="/parallel-route">Admin</Link>
        <Link href="/parallel-route/settings">Settings</Link>
        <Link href="/parallel-route/tasks">Tasks</Link>
      </nav>
      <div>{children}</div>
    </>
  );
}
