"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Books } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Image from "next/image";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const isLoggedIn = !!session?.user;

  const firstWord = session?.user?.name?.split(" ")[0]?.[0]?.toUpperCase() ?? "U";

  const navLinks = [
    { label: "Home", href: "/", protected: false },
    { label: "Rooms", href: "/rooms", protected: false },
    { label: "Add Room", href: "/AddRoom", protected: true },
    { label: "My Listing", href: "/MyListing", protected: true },
    { label: "My Bookings", href: "/MyBookings", protected: true },
  ];

  const visibleLinks = navLinks.filter(
    (link) => !link.protected || isLoggedIn
  );

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const Avatar = ({ className = "w-8 h-8 text-sm" }) =>
    session?.user?.image ? (
      <motion.img
        src={session.user.image}
        alt={session.user.name || "User"}
        className={`rounded-full object-cover border-2 border-[#C9A96E] ${className}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    ) : (
      <motion.div
        className={`rounded-full border-2 border-[#C9A96E] bg-[#C9A96E]/20 flex items-center justify-center font-bold text-[#C9A96E] ${className}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {firstWord}
      </motion.div>
    );

  const links = visibleLinks.map((link, index) => (
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
            className="flex items-center gap-1 font-bold text-xl text-[#C9A96E] font-serif tracking-wide"
          >
            <Books />
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
          {isLoggedIn ? (
            <>
              <Avatar className="w-8 h-8 text-sm" />

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button
                  onClick={handleSignOut}
                  className="text-sm font-semibold text-[#3B2F1E] bg-[#C9A96E] px-4 py-2 rounded-full hover:bg-[#b8944f] transition-colors"
                >
                  Sign Out
                </Button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/authentication/signin"
                  className="text-sm font-semibold text-[#C9A96E] border border-[#C9A96E] px-4 py-2 rounded-full hover:bg-[#C9A96E]/10 transition-colors inline-block"
                >
                  Login
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/authentication/signup"
                  className="text-sm font-semibold text-[#3B2F1E] bg-[#C9A96E] px-4 py-2 rounded-full hover:bg-[#b8944f] transition-colors inline-block"
                >
                  Register
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Mobile — Hamburger */}
        <motion.button
          className="lg:hidden p-2 rounded-md text-[#F5EDD8] hover:text-[#C9A96E] hover:bg-[#5a4a38]/40 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <HiMiniBars3CenterLeft />
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
              {visibleLinks.map((link, index) => (
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
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5">
                    <Avatar className="w-7 h-7 text-xs" />
                    <span className="text-sm text-[#F5EDD8] font-medium">
                      {session.user.name}
                    </span>
                  </div>
                  <button
                    onClick={() => { setMenuOpen(false); handleSignOut(); }}
                    className="text-sm font-semibold text-[#3B2F1E] bg-[#C9A96E] px-4 py-2 rounded-full hover:bg-[#b8944f] transition-colors text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/authentication/signin"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-semibold text-[#C9A96E] border border-[#C9A96E] px-4 py-2 rounded-full hover:bg-[#C9A96E]/10 transition-colors text-center"
                  >
                    Login
                  </Link>
                  <Link
                    href="/authentication/signup"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-semibold text-[#3B2F1E] bg-[#C9A96E] px-4 py-2 rounded-full hover:bg-[#b8944f] transition-colors text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;