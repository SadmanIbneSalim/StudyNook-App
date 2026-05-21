import { Table, Button } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { BookingDataDelete } from "./BookingDataDelete";

// Format date like: May 21, 2026
const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Status badge color
const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-amber-100 text-amber-700 border border-amber-200",
    confirmed: "bg-green-100 text-green-700 border border-green-200",
    cancelled: "bg-red-100 text-red-600 border border-red-200",
  };
  const label = status || "pending";
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
        styles[label.toLowerCase()] || styles.pending
      }`}
    >
      {label}
    </span>
  );
};

const DataTable = ({ bookings }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#9C7E57]">
        <span className="text-5xl mb-4">📚</span>
        <p className="text-lg font-semibold text-[#3B2F1E]">No bookings yet</p>
        <p className="text-sm mt-1">Your room bookings will appear here.</p>
      </div>
    );
  }
  console.log(bookings)

  return (
    <Table className="w-full">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="My Bookings"
          className="min-w-[700px] rounded-2xl overflow-hidden border border-[#E5D9C3]"
        >
          {/* Header */}
          <Table.Header className="bg-[#2C1F0E]">
            <Table.Column
              isRowHeader
              className="text-[#C9A96E] font-semibold text-xs uppercase tracking-widest py-4 px-5"
            >
              Room
            </Table.Column>
            <Table.Column className="text-[#C9A96E] font-semibold text-xs uppercase tracking-widest py-4 px-5">
              Date
            </Table.Column>
            <Table.Column className="text-[#C9A96E] font-semibold text-xs uppercase tracking-widest py-4 px-5">
              Time
            </Table.Column>
            <Table.Column className="text-[#C9A96E] font-semibold text-xs uppercase tracking-widest py-4 px-5">
              Duration
            </Table.Column>
            <Table.Column className="text-[#C9A96E] font-semibold text-xs uppercase tracking-widest py-4 px-5">
              Cost
            </Table.Column>
            <Table.Column className="text-[#C9A96E] font-semibold text-xs uppercase tracking-widest py-4 px-5">
              Status
            </Table.Column>
            <Table.Column className="text-[#C9A96E] font-semibold text-xs uppercase tracking-widest py-4 px-5">
              Action
            </Table.Column>
          </Table.Header>

          {/* Rows */}
          <Table.Body>
            {bookings.map((booking, index) => (
              <Table.Row
                key={booking._id || booking.id || index}
                className={`border-b border-[#EDE5D8] transition-colors hover:bg-[#FDF8F0] ${
                  index % 2 === 0 ? "bg-white" : "bg-[#FDFAF5]"
                }`}
              >
                {/* Room */}
                <Table.Cell className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    {booking.imageUrl && (
                      <Image
                        src={booking.imageUrl}
                        alt={booking.roomName}
                        width={50}
                        height={50}
                        className="w-10 h-10 rounded-lg object-cover border border-[#E5D9C3]"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-[#2C1F0E] text-sm">
                        {booking.roomName || "—"}
                      </p>
                      <p className="text-xs text-[#9C7E57]">
                        ${booking.rate}/hr
                      </p>
                    </div>
                  </div>
                </Table.Cell>

                {/* Date */}
                <Table.Cell className="py-4 px-5 text-sm text-[#3B2F1E]">
                  {formatDate(booking.bookingDate)}
                </Table.Cell>

                {/* Time */}
                <Table.Cell className="py-4 px-5">
                  <span className="text-sm text-[#3B2F1E] font-mono">
                    {booking.startTime && booking.endTime
                      ? `${booking.startTime} – ${booking.endTime}`
                      : "—"}
                  </span>
                </Table.Cell>

                {/* Duration */}
                <Table.Cell className="py-4 px-5 text-sm text-[#3B2F1E]">
                  {booking.totalHours
                    ? `${booking.totalHours} hr${booking.totalHours > 1 ? "s" : ""}`
                    : "—"}
                </Table.Cell>

                {/* Cost */}
                <Table.Cell className="py-4 px-5">
                  <span className="font-bold text-[#2C1F0E] text-sm font-serif">
                    {booking.totalCost ? `$${booking.totalCost}` : "—"}
                  </span>
                </Table.Cell>

                {/* Status */}
                <Table.Cell className="py-4 px-5">
                  <StatusBadge status={booking.status} />
                </Table.Cell>

                {/* Action */}
                <Table.Cell className="py-4 px-5">
                  <BookingDataDelete bookingId={booking._id} />
                  
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};

export default DataTable;