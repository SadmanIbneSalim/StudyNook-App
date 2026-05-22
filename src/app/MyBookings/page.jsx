import DataTable from "@/components/DataTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const MyBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const res = await fetch(`http://localhost:2001/booking/${user?.id}`, {
    cache: "no-store",
  });
  const bookings = await res.json();

  return (
    <div className="bg-[#F5EDD8] min-vh-70 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="block w-6 h-[3px] bg-[#C9A96E] rounded-full" />
            <p className="text-xs text-[#9C7E57] font-semibold uppercase tracking-widest">
              StudyNook
            </p>
          </div>
          <h1 className="text-3xl font-bold text-[#2C1F0E] font-serif">
            My Bookings
          </h1>
          <p className="text-sm text-[#9C7E57] mt-1">
            Hello,{" "}
            <span className="font-semibold text-[#3B2F1E]">
              {user?.name || "there"}
            </span>{" "}
            — here are all your room reservations.
          </p>
        </div>

        {/* Stats Row */}
        {bookings?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-[#E5D9C3] px-5 py-4">
              <p className="text-xs text-[#9C7E57] font-medium uppercase tracking-wide mb-1">
                Total Bookings
              </p>
              <p className="text-2xl font-bold text-[#2C1F0E] font-serif">
                {bookings.length}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[#E5D9C3] px-5 py-4">
              <p className="text-xs text-[#9C7E57] font-medium uppercase tracking-wide mb-1">
                Total Hours
              </p>
              <p className="text-2xl font-bold text-[#2C1F0E] font-serif">
                {bookings.reduce((sum, b) => sum + (b.totalHours || 0), 0)}h
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[#E5D9C3] px-5 py-4">
              <p className="text-xs text-[#9C7E57] font-medium uppercase tracking-wide mb-1">
                Total Spent
              </p>
              <p className="text-2xl font-bold text-[#C9A96E] font-serif">
                ${bookings.reduce((sum, b) => sum + (b.totalCost || 0), 0)}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[#E5D9C3] px-5 py-4">
              <p className="text-xs text-[#9C7E57] font-medium uppercase tracking-wide mb-1">
                Confirmed
              </p>
              <p className="text-2xl font-bold text-green-600 font-serif">
                {
                  bookings.filter(
                    (b) => b.status?.toLowerCase() === "confirmed"
                  ).length
                }
              </p>
            </div>
          </div>
        )}

        {/* Table Card */}
        <div className="bg-white rounded-3xl border border-[#E5D9C3] shadow-sm overflow-hidden">
          {/* Table Header bar */}
          <div className="px-6 py-4 border-b border-[#EDE5D8] flex items-center justify-between">
            <h2 className="font-semibold text-[#2C1F0E] text-sm">
              Reservation History
            </h2>
            <span className="text-xs text-[#9C7E57] bg-[#F5EDD8] px-3 py-1 rounded-full border border-[#E5D9C3]">
              {bookings?.length || 0} records
            </span>
          </div>

          {/* DataTable gets the full bookings array */}
          <DataTable bookings={bookings} />
        </div>

      </div>
    </div>
  );
};

export default MyBookings;