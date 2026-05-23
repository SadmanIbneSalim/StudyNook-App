"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CircleExclamation, House, Magnifier } from "@gravity-ui/icons";

// export const metadata = {
//   title: "StudyNook | Page Not Found",
//   description:
//     "The page you are looking for does not exist. Return to StudyNook and continue exploring available study rooms. ",
// };

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col items-center justify-center px-6 text-center ">
      {/* Animated 404 number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="select-none"
      >
        <span className="font-bold text-[200px] font-serif leading-none text-red-600  ">
          404
        </span>
      </motion.div>

      {/* Icon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-5 -mt-6"
      >
        <div className="w-16 h-16 rounded-full bg-[#EDE8DF] flex items-center justify-center mx-auto">
          <CircleExclamation></CircleExclamation>
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-2xl md:text-3xl font-semibold text-[#3B2F1E] font-serif mb-3"
      >
        Page not found
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="text-[#7A5C38] text-sm md:text-base max-w-sm leading-relaxed mb-8"
      >
        The page you are looking for does not exist or has been moved. Let's get
        you back to finding your perfect study room.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-[#F5EDD8] bg-[#3B2F1E] px-6 py-2.5 rounded-full hover:bg-[#4e3d28] transition-colors"
          >
            <House></House>
            Back to home
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link
            href="/rooms"
            className="flex items-center gap-2 text-sm font-semibold text-[#3B2F1E] border border-[#3B2F1E] px-6 py-2.5 rounded-full hover:bg-[#EDE8DF] transition-colors"
          >
            <Magnifier></Magnifier>
            Browse rooms
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="absolute bottom-10 flex gap-2"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] opacity-40"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default NotFound;
