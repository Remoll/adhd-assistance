import React from "react";
import Link from "next/link";

const Header = () => {
  const pages = [
    { href: "/", label: "Dashboard" },
    { href: "/planner", label: "Planer" },
    { href: "/settings", label: "Ustawienia" },
  ];

  return (
    <header className="bg-blue-600 text-white py-4">
      <nav className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">ADHD AI Assistance</h1>
        <ul className="flex gap-4">
          {pages.map((page) => (
            <li key={page.href}>
              <Link href={page.href} className="hover:underline">
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
