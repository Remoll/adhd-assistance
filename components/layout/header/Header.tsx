import React from "react";
import Link from "next/link";
import { Button } from "../../ui/button";
import useUserStore from "@/stores/user/store";

const Header = () => {
  const { logoutUser } = useUserStore();

  const pages = [
    { href: "/", label: "Dashboard" },
    { href: "/planner", label: "Planer" },
    { href: "/settings", label: "Ustawienia" },
  ];

  return (
    <header className="bg-gray-900 text-white py-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">ADHD AI Assistance</h1>
        <ul className="flex gap-6 items-center">
          {pages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="hover:text-gray-400 transition-colors duration-200"
              >
                {page.label}
              </Link>
            </li>
          ))}
          <li>
            <Button onClick={logoutUser} variant="destructive">
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
