"use client";
import {
  Description,
  FieldError,
  Label,
  SearchField,
  Separator,
} from "@heroui/react";
import { motion } from "motion/react";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="bg-[url('/assets/Banner.png')] bg-cover text-white flex justify-between flex-col items-center gap-5 h-180 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 pointer-events-none z-0" />

      {/* Hero content */}
      <div className="p-10 text-center flex justify-center flex-col items-center gap-3.5 flex-1 relative z-10">
        <motion.h1
          className="text-5xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Your Perfect Study Corner,
          <br /> Just a Click Away.
        </motion.h1>

        <motion.p
          className="text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Browse and book quiet, private study rooms in your library. List your
          own room and earn.
        </motion.p>

        <motion.div
          className="flex gap-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <motion.button
            className="uppercase font-bold bg-[#C9A96E] px-5 py-3 rounded-3xl cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link href={"/rooms"}>Explore Now</Link>
            
          </motion.button>

          <motion.button
            className="uppercase px-5 py-3 bg-white/50 rounded-3xl cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
             <Link href={"/rooms"}>View Rooms</Link>
            
          </motion.button>
        </motion.div>
      </div>

      {/* Search bar */}
      <motion.div
        className="bg-white/50 flex flex-wrap justify-between gap-3 w-full items-center px-4 py-4 overflow-hidden drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
      >
        {/* Location */}
        <motion.div
          className="min-w-0 flex-1 basis-[40%] sm:basis-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xs sm:text-sm font-semibold text-white">
            Location
          </h3>
          <p className="text-[10px] sm:text-xs text-white truncate">
            Dhaka, Bangladesh
          </p>
        </motion.div>

        <Separator
          variant="tertiary"
          orientation="vertical"
          className="h-8 hidden sm:block"
        />

        {/* Date/Duration */}
        <motion.div
          className="min-w-0 flex-1 basis-[40%] sm:basis-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          <h3 className="text-xs sm:text-sm font-semibold text-white">
            Date/Duration
          </h3>
          <p className="text-[10px] sm:text-xs text-white truncate">
            Anytime 7 Days
          </p>
        </motion.div>

        <Separator
          variant="tertiary"
          orientation="vertical"
          className="h-8 hidden sm:block"
        />

        {/* Budget */}
        <motion.div
          className="min-w-0 flex-1 basis-[40%] sm:basis-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xs sm:text-sm font-semibold text-white">
            Budget
          </h3>
          <p className="text-[10px] sm:text-xs text-white truncate">
            Affordable
          </p>
        </motion.div>

        <Separator
          variant="tertiary"
          orientation="vertical"
          className="h-8 hidden sm:block"
        />

        <motion.div
          className="min-w-0 flex-1 basis-[40%] sm:basis-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
        >
          <h3 className="text-xs sm:text-sm font-semibold text-white">
            People
          </h3>
          <p className="text-[10px] sm:text-xs text-white truncate">5-10</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;
