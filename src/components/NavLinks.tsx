"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between p-4 bg-yellow-600">
      <h1 className="text-3xl font-bold">Middleware Practice</h1>
      <ul className="flex gap-4">
        <li>
          <Link
            href="/"
            className={`link ${pathname === "/" ? "text-black" : ""}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={`link ${pathname === "/blog" ? "text-black" : ""}`}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard"
            className={`link ${pathname === "/dashboard" ? "text-black" : ""}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/parallel-route"
            className={`link ${
              pathname === "/parallel-route" ? "text-black" : ""
            }`}
          >
            Parallel Route
          </Link>
        </li>
      </ul>
    </nav>
  );
}
