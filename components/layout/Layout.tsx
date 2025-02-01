import React, { ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto flex-1 py-6">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
