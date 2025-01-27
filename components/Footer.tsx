import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      &copy; {new Date().getFullYear()} ADHD AI Assistance. Wszelkie prawa
      zastrzeżone.
    </footer>
  );
};

export default Footer;
