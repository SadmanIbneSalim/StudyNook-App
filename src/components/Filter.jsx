"use client";

import { useState, useEffect, useCallback } from "react";
import RoomCard from "@/components/Card";

const amenitiesList = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const RoomFilter = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [activeAmenities, setActiveAmenities] = useState([]);
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (activeAmenities.length > 0)
        params.append("amenities", activeAmenities.join(","));
      if (minRate) params.append("minRate", minRate);
      if (maxRate) params.append("maxRate", maxRate);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms?${params.toString()}`
      );
      let data = await res.json();

      // client-side sort
      if (sort === "price-asc") data.sort((a, b) => a.rate - b.rate);
      else if (sort === "price-desc") data.sort((a, b) => b.rate - a.rate);
      else if (sort === "capacity")
        data.sort((a, b) => b.capacity - a.capacity);

      setRooms(data);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    } finally {
      setLoading(false);
    }
  }, [search, sort, activeAmenities, minRate, maxRate]);

  // search এ debounce — user টাইপ করার সাথে সাথে API call না করে 500ms পর করবে
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRooms();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchRooms]);

  const toggleAmenity = (item) => {
    setActiveAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const clearAll = () => {
    setSearch("");
    setSort("");
    setActiveAmenities([]);
    setMinRate("");
    setMaxRate("");
  };

  const isFiltered =
    search || sort || activeAmenities.length > 0 || minRate || maxRate;

  return (
    <div className="mx-4 pb-8">
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7560]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by name, floor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d4c4a8] bg-white text-[#3b2e1e] text-sm focus:outline-none focus:border-[#C9A96E]"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="sm:w-52 px-4 py-2.5 rounded-xl border border-[#d4c4a8] bg-white text-[#3b2e1e] text-sm focus:outline-none focus:border-[#C9A96E]"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="capacity">Most Seats</option>
        </select>

        {/* Clear */}
        {isFiltered && (
          <button
            onClick={clearAll}
            className="px-5 py-2.5 border border-[#d4c4a8] text-[#8a7560] rounded-xl text-sm hover:border-[#C9A96E] hover:text-[#3b2e1e] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Rate Range Filter */}
      <div className="flex gap-3 mb-5">
        <input
          type="number"
          placeholder="Min rate ($/hr)"
          value={minRate}
          onChange={(e) => setMinRate(e.target.value)}
          className="w-40 px-4 py-2.5 rounded-xl border border-[#d4c4a8] bg-white text-[#3b2e1e] text-sm focus:outline-none focus:border-[#C9A96E]"
        />
        <input
          type="number"
          placeholder="Max rate ($/hr)"
          value={maxRate}
          onChange={(e) => setMaxRate(e.target.value)}
          className="w-40 px-4 py-2.5 rounded-xl border border-[#d4c4a8] bg-white text-[#3b2e1e] text-sm focus:outline-none focus:border-[#C9A96E]"
        />
      </div>

      {/* Amenities Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {amenitiesList.map((item) => (
          <button
            key={item}
            onClick={() => toggleAmenity(item)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeAmenities.includes(item)
                ? "bg-[#3b2e1e] text-white border-[#3b2e1e]"
                : "bg-white text-[#8a7560] border-[#d4c4a8] hover:border-[#C9A96E]"
            }`}
          >
            {activeAmenities.includes(item) ? "✓ " : ""}
            {item}
          </button>
        ))}
      </div>

      {/* Result Count */}
      <p className="text-sm text-[#8a7560] mb-4">
        {loading
          ? "Searching..."
          : `${rooms.length} room${rooms.length !== 1 ? "s" : ""} found`}
      </p>

      {/* Cards */}
      {loading ? (
        <div className="text-center py-20">
          <p className="text-[#8a7560]">Loading rooms...</p>
        </div>
      ) : rooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((data) => (
            <RoomCard key={data._id} data={data} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl font-semibold text-[#3b2e1e]">No rooms found</p>
          <p className="text-sm text-[#8a7560] mt-2">
            Try changing your search or filters
          </p>
          <button
            onClick={clearAll}
            className="mt-4 px-6 py-2.5 bg-[#3b2e1e] text-white rounded-xl text-sm hover:bg-[#C9A96E] transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomFilter;