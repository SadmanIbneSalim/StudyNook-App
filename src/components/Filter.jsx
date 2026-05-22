"use client";

import { useState, useMemo } from "react";
import RoomCard from "@/components/Card";

const amenitiesList = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
];

const RoomFilter = ({ roomData }) => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [activeAmenities, setActiveAmenities] = useState([]);

    const toggleAmenity = (item) => {
        setActiveAmenities((prev) =>
            prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
        );
    };

    const filtered = useMemo(() => {
        if (!Array.isArray(roomData)) return [];
        let result = [...roomData];

        if (search) {
            result = result.filter(
                (room) =>
                    room.name?.toLowerCase().includes(search.toLowerCase()) ||
                    room.floor?.toLowerCase().includes(search.toLowerCase()) ||
                    room.description?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (activeAmenities.length > 0) {
            result = result.filter((room) =>
                activeAmenities.every((amenity) =>
                    room.amenities?.includes(amenity)
                )
            );
        }

        if (sort === "price-asc") result.sort((a, b) => a.rate - b.rate);
        else if (sort === "price-desc") result.sort((a, b) => b.rate - a.rate);
        else if (sort === "capacity") result.sort((a, b) => b.capacity - a.capacity);

        return result;
    }, [search, sort, activeAmenities, roomData]);

    const clearAll = () => {
        setSearch("");
        setSort("");
        setActiveAmenities([]);
    };

    const isFiltered = search || sort || activeAmenities.length > 0;

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
                {filtered.length} room{filtered.length !== 1 ? "s" : ""} found
            </p>

            {/* Cards */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((data) => (
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