"use client"
import { Separator } from "@heroui/react";
import { motion } from "motion/react";

const Banner = () => {
  return (
    <div className="bg-[url('/assets/Banner.png')] bg-cover text-white flex justify-between flex-col items-center gap-5 h-180">

      {/* Hero content */}
      <div className="p-10 text-center flex justify-center flex-col items-center gap-3.5 flex-1">

        <motion.h1
          className="text-5xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Your Perfect Study Corner,<br /> Just a Click Away. 
        </motion.h1>

        <motion.p
          className="text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Browse and book quiet, private study rooms in your library. List your own room and earn.
        </motion.p>

        <motion.div
          className="flex gap-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <motion.button
            className="uppercase text-bold bg-[#C9A96E] px-5 py-3 rounded-3xl cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            Explore Now
          </motion.button>

          <motion.button
            className="uppercase px-5 py-3 bg-white/50 rounded-3xl cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            View Destination
          </motion.button>
        </motion.div>
      </div>

      {/* Search bar */}
      <motion.div
        className="bg-white/50  flex justify-between gap-5 w-full items-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
      >
        <motion.div
          className="px-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-sm">Location</h3>
          <p className="text-xs">Dhaka, Bangladesh</p>
        </motion.div>

        <Separator variant="tertiary" orientation="vertical" />

        <motion.div className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          <h3 className="text-sm">Date/Duration</h3>
          <p className="text-xs">Anytime/6 Days</p>
        </motion.div>

        <Separator variant="tertiary" orientation="vertical" />

        <motion.div 
        className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-sm">Budget</h3>
          <p className="text-xs">$5-$15</p>
        </motion.div>

        <Separator variant="tertiary" orientation="vertical" />

        <motion.div
        className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
        >
          <h3 className="text-sm">People</h3>
          <p className="text-xs">5-10</p>
        </motion.div>

        
      </motion.div>

    </div>
  );
};

export default Banner;