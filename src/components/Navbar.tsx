import React, { useState } from "react";
import { Menu, X, Globe, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BusinessInfo } from "../types";

interface NavbarProps {
  businessInfo: BusinessInfo;
  lang: "en" | "hi";
  setLang: (l: "en" | "hi") => void;
  onAdminClick: () => void;
}

export default function Navbar({ businessInfo, lang, setLang, onAdminClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: lang === "en" ? "About" : "परिचय", href: "#about" },
    { label: lang === "en" ? "Courses" : "कोर्स", href: "#courses" },
    { label: lang === "en" ? "Gallery" : "गैलरी", href: "#gallery" },
    { label: lang === "en" ? "FAQs" : "सवाल-जवाब", href: "#faqs" },
    { label: lang === "en" ? "Contact" : "संपर्क", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header id="navbar" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl text-rose-900 tracking-tight leading-none">
                {businessInfo.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-amber-700 tracking-wider uppercase mt-1">
                {lang === "en" ? "Spoken English Academy" : "स्पोकन इंग्लिश अकादमी"}
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="font-sans text-sm font-medium text-slate-700 hover:text-rose-900 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Controls: Lang toggle, Quick Call, Admin */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle Pill */}
            <div className="flex items-center bg-rose-50 border border-rose-100 p-0.5 rounded-full">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                  lang === "en"
                    ? "bg-rose-900 text-white shadow-xs"
                    : "text-rose-900 hover:bg-rose-100"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                  lang === "hi"
                    ? "bg-rose-900 text-white shadow-xs"
                    : "text-rose-900 hover:bg-rose-100"
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Quick Call Button */}
            <a
              href={`tel:${businessInfo.phone}`}
              className="flex items-center space-x-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-4 py-1.5 rounded-full text-xs shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Call Now" : "कॉल करें"}</span>
            </a>

            {/* Admin link */}
            <button
              onClick={onAdminClick}
              className="text-xs text-slate-400 hover:text-slate-600 hover:underline"
            >
              {lang === "en" ? "Admin" : "एडमिन"}
            </button>
          </div>

          {/* Mobile menu button and Lang toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Lang toggle for mobile */}
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="p-1.5 bg-rose-50 border border-rose-100 rounded-full text-rose-900 flex items-center justify-center"
              aria-label="Toggle Language"
            >
              <Globe className="w-4 h-4 mr-1 text-rose-900" />
              <span className="text-[11px] font-bold pr-1">{lang === "en" ? "HI" : "EN"}</span>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-rose-900 hover:bg-rose-50 focus:outline-none"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-rose-100 bg-white"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-700 hover:text-rose-900 hover:bg-rose-50 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 pb-2 border-t border-rose-100 px-3 flex flex-col gap-3">
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="w-full flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>{lang === "en" ? `Call Shamim Sir` : `शमीम सर को कॉल करें`}</span>
                </a>

                <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
                  <span>{lang === "en" ? "Academy Access" : "अकादमी एक्सेस"}</span>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onAdminClick();
                    }}
                    className="text-rose-900 underline font-medium"
                  >
                    {lang === "en" ? "Admin Panel" : "एडमिन पैनल"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
