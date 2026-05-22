"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: 1,
    title: "Browse rooms",
    description: "Search and filter rooms by floor, capacity, or amenities",
  },
  {
    number: 2,
    title: "Pick a slot",
    description: "Choose your date and hourly time slot with live availability",
  },
  {
    number: 3,
    title: "Confirm & go",
    description: "Get instant confirmation and head to your study session",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#EDE8DF] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section title */}
        <motion.h2
          className="text-xl font-semibold text-center text-[#3B2F1E] mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          How it works
        </motion.h2>

        {/* Steps row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center gap-3 bg-[#EDE8DF] px-4 py-2"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.15, ease: "easeOut" }}
            >
              {/* Number circle */}
              <motion.div
                className="w-10 h-10 rounded-full bg-[#3B2F1E] text-[#C9A96E] font-semibold text-base flex items-center justify-center"
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.15 + 0.1 }}
              >
                {step.number}
              </motion.div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-[#3B2F1E]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-[#7A5C38] leading-relaxed max-w-[200px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;