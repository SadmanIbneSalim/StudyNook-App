"use client";

import { House, Person, Tags } from "@gravity-ui/icons";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function RoomCard({ data }) {
  const {
    _id,
    image,
    name,
    description,
    floor,
    capacity,
    rate,
    amenities,
  } = data;

  const shortDescription =
    description.length > 100
      ? description.slice(0, 100) + "..."
      : description;

  const visibleAmenities = amenities.slice(0, 3);
  const remainingCount = amenities.length - 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden">
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={image}
            alt={name}
            width={500}
            height={250}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Rate badge on image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-bold px-3 py-1.5 rounded-full shadow"
        >
          ${rate}
          <span className="text-xs font-normal text-gray-500">/hr</span>
        </motion.div>

        {/* Floor badge on image */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
            Floor {floor}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col gap-3">

        {/* Room Name */}
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200"
        >
          {name}
        </motion.h2>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed">
          {shortDescription}
        </p>

       
        <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1.5">
            
            <Person></Person>
            <span className="font-medium">{capacity}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Building icon */}
            <House></House>
            <span className="font-medium">Floor {floor}</span>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
           
           <Tags className="text-green-600"/>
            <span className="font-semibold text-green-600">${rate}/hr</span>
          </div>
        </div>

       
        <div className="flex flex-wrap gap-2">
          {visibleAmenities.map((item, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index + 0.3, duration: 0.3 }}
              className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1 rounded-full font-medium"
            >
              {item}
            </motion.span>
          ))}

          {remainingCount > 0 && (
            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-medium">
              +{remainingCount} more
            </span>
          )}
        </div>

      
        <Link href={`/rooms/${_id}`}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-1 py-2.5 px-4 rounded-xl bg-[#3B2F1E] hover:bg-indigo-700 text-white text-sm font-semibold transition-colors duration-200 shadow-md shadow-indigo-200"
          >
            View Details →
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}