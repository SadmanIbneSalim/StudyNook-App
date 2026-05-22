"use client";

import { motion } from "motion/react";

const stats = [
  {
    icon: "🏛️",
    value: "120+",
    label: "Rooms listed",
  },
  {
    icon: "📅",
    value: "1,400+",
    label: "Successful bookings",
  },
  {
    icon: "⭐",
    value: "4.9/5",
    label: "Average rating",
  },
];

const TrustedByStudents = () => {
  return (
    <section className="bg-[#F5EDD8] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section title */}
        <motion.h2
          className="text-xl font-semibold text-center text-[#3B2F1E] mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          Trusted by students
        </motion.h2>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white border border-[#d1c8b0] rounded-2xl px-6 py-8 flex flex-col items-center justify-center gap-2 text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Icon */}
              <motion.span
                className="text-2xl text-[#7A5C38]"
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.15 + 0.1 }}
              >
                {stat.icon}
              </motion.span>

              {/* Value */}
              <span className="text-2xl md:text-3xl font-bold text-[#3B2F1E] font-serif">
                {stat.value}
              </span>

              {/* Label */}
              <span className="text-xs text-[#7A5C38]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustedByStudents;