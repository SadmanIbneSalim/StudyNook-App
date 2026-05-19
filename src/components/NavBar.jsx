"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Rooms", href: "/rooms" },
  ];

  const links = navLinks.map((link, index) => (
    <motion.li
      key={link.href}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
      className="list-none"
    >
      <Link
        href={link.href}
        onClick={() => setMenuOpen(false)}
        className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          pathname === link.href
            ? "bg-[#C9A96E] text-[#3B2F1E]"
            : "text-[#F5EDD8] hover:text-[#C9A96E]"
        }`}
      >
        {link.label}

        {pathname !== link.href && (
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-[#C9A96E] rounded"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.25 }}
          />
        )}
      </Link>
    </motion.li>
  ));

  return (
    <motion.div
      className="sticky top-0 z-50 border-b border-[#5a4a38]/40"
      style={{
        backgroundColor: "rgba(59, 47, 30, 0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">

        {/* Left — Brand */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-[#C9A96E] font-serif tracking-wide"
          >
            {/* Book icon inline SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.6}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12M6 3h12a1 1 0 011 1v16a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3v18M6 7h3M6 11h3M6 15h3"
              />
            </svg>
            StudyNook
          </Link>
        </motion.div>

        {/* Center — Desktop Links */}
        <ul className="hidden lg:flex items-center gap-2 m-0 p-0">
          {links}
        </ul>

        {/* Right — Auth Buttons */}
        <motion.div
          className="hidden lg:flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/signin"
              className="text-sm font-semibold text-[#C9A96E] border border-[#C9A96E] px-4 py-2 rounded-full hover:bg-[#C9A96E]/10 transition-colors inline-block"
            >
              Login
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/signup"
              className="text-sm font-semibold text-[#3B2F1E] bg-[#C9A96E] px-4 py-2 rounded-full hover:bg-[#b8944f] transition-colors inline-block"
            >
              Register
            </Link>
          </motion.div>
        </motion.div>

        {/* Mobile — Hamburger */}
        <motion.button
          className="lg:hidden p-2 rounded-md text-[#F5EDD8] hover:text-[#C9A96E] hover:bg-[#5a4a38]/40 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              animate={
                menuOpen
                  ? { d: "M6 18L18 6M6 6l12 12" }
                  : { d: "M4 6h16M4 12h8m-8 6h16" }
              }
              transition={{ duration: 0.3 }}
            />
          </svg>
        </motion.button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden border-t border-[#5a4a38]/40 px-6 py-4 overflow-hidden"
            style={{
              backgroundColor: "rgba(59, 47, 30, 0.88)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ul className="flex flex-col gap-2 m-0 p-0">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="list-none"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-[#C9A96E] text-[#3B2F1E]"
                        : "text-[#F5EDD8] hover:text-[#C9A96E]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="flex flex-col gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/signin"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold text-center text-[#C9A96E] border border-[#C9A96E] px-4 py-2 rounded-full hover:bg-[#C9A96E]/10 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold text-center text-[#3B2F1E] bg-[#C9A96E] px-4 py-2 rounded-full hover:bg-[#b8944f] transition-colors"
              >
                Register
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;