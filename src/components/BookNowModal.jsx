"use client";

import { authClient } from "@/lib/auth-client";
import { Clock, Rocket } from "@gravity-ui/icons";
import { Button, Calendar, Modal } from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const TIME_SLOTS = [
  "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM",
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM",
];

const timeToHour = (timeStr) => {
  if (!timeStr) return null;
  const [time, period] = timeStr.split(" ");
  let hour = parseInt(time.split(":")[0]);
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return hour;
};

const BookNowModal = ({ data }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const todayDate = today(getLocalTimeZone());
  const currentHour = new Date().getHours();

  const [bookingDate, setBookingDate] = useState(todayDate);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const isToday = bookingDate
    ? bookingDate.toString() === todayDate.toString()
    : false;

  const isSlotDisabled = (slot) => {
    if (!isToday) return false;
    const slotHour = timeToHour(slot);
    return slotHour <= currentHour;
  };

  const getEndTimeOptions = () => {
    if (!startTime) return [];
    const startIdx = TIME_SLOTS.indexOf(startTime);
    return TIME_SLOTS.slice(startIdx + 1);
  };

  const startHour = timeToHour(startTime);
  const endHour = timeToHour(endTime);
  const totalHours =
    startHour !== null && endHour !== null && endHour > startHour
      ? endHour - startHour
      : null;
  const totalCost = totalHours ? totalHours * data?.rate : null;

  const handleDateChange = (date) => {
    setBookingDate(date);
    setStartTime("");
    setEndTime("");
  };

  
  const handleOpenModal = () => {
    if (!user) {
      router.push(`/authentication/signin?callbackUrl=/rooms/${data?._id}`);
      return;
    }
    setIsOpen(true);
  };

  const handleBooking = async () => {
    if (!bookingDate || !startTime || !endTime) {
      toast.error("Please fill all fields.");
      return;
    }

    const bookingData = {
      userId: user?.id || null,
      userImage: user?.image || null,
      userName: user?.name || null,
      roomId: data?._id,
      roomName: data?.name,
      rate: data?.rate,
      imageUrl: data?.image,
      bookingDate: new Date(bookingDate.toString()),
      startTime,
      endTime,
      totalHours: totalHours || null,
      totalCost: totalCost || null,
      status: "pending",
    };

    const { data: tokenData } = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (res.status === 409) {
      const error = await res.json();
      toast.error(error.message, { position: "top-center", autoClose: 5000 });
      return;
    }

    if (res.ok) {
      toast.success("Room booked successfully!", { position: "top-center" });
      setIsOpen(false);
      router.refresh(); 
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button
          onPress={handleOpenModal}
          className="w-full font-bold text-[#F5EDD8] bg-[#2C1F0E] hover:bg-[#3D2B13] transition-all duration-200"
          size="lg"
          radius="md"
        >
          Book Now
        </Button>

        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-2xl">
              <Modal.CloseTrigger />

              {/* Header */}
              <Modal.Header className="border-b border-[#EDE5D8] pb-4">
                <Modal.Icon className="bg-[#F5EDD8] text-[#2C1F0E]">
                  <Rocket className="size-5" />
                </Modal.Icon>
                <div>
                  <Modal.Heading className="text-[#2C1F0E] font-serif text-xl font-bold">
                    Reserve Your Room
                  </Modal.Heading>
                  <p className="text-sm text-[#9C7E57] mt-0.5">
                    {data?.name || "Study Room"}
                  </p>
                </div>
              </Modal.Header>

              {/* Body */}
              <Modal.Body className="py-6 flex flex-col gap-6">

                {/* Rate Banner */}
                <div className="bg-[#F5EDD8] rounded-xl px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#9C7E57] font-medium uppercase tracking-wide">
                      Hourly Rate
                    </p>
                    <p className="text-2xl font-bold text-[#2C1F0E] font-serif">
                      ${data?.rate}
                      <span className="text-sm font-normal text-[#9C7E57] ml-1">/ hour</span>
                    </p>
                  </div>
                  {totalCost && (
                    <div className="text-right">
                      <p className="text-xs text-[#9C7E57] font-medium uppercase tracking-wide">
                        Estimated Total
                      </p>
                      <p className="text-2xl font-bold text-[#C9A96E] font-serif">
                        ${totalCost}
                      </p>
                      <p className="text-xs text-[#9C7E57]">
                        {totalHours} hr{totalHours > 1 ? "s" : ""}
                      </p>
                    </div>
                  )}
                </div>

                {/* Calendar + Time */}
                <div className="flex flex-col sm:flex-row gap-6">

                  {/* Calendar */}
                  <div className="flex flex-col gap-2 flex-1">
                    <span className="text-sm font-semibold text-[#3B2F1E]">
                      Select Date
                    </span>
                    <div className="border border-[#DDD5C4] rounded-xl bg-[#FDFAF5] p-3 w-full">
                      <Calendar
                        aria-label="Booking date"
                        defaultValue={todayDate}
                        minValue={todayDate}
                        onChange={handleDateChange}
                        className="w-full"
                      >
                        <Calendar.Header className="flex items-center justify-between mb-2 px-1">
                          <Calendar.NavButton
                            slot="previous"
                            className="text-[#9C7E57] hover:text-[#2C1F0E] transition-colors p-1 rounded"
                          />
                          <Calendar.Heading className="text-sm font-bold text-[#2C1F0E]" />
                          <Calendar.NavButton
                            slot="next"
                            className="text-[#9C7E57] hover:text-[#2C1F0E] transition-colors p-1 rounded"
                          />
                        </Calendar.Header>
                        <Calendar.Grid className="w-full">
                          <Calendar.GridHeader>
                            {(day) => (
                              <Calendar.HeaderCell className="text-xs text-[#9C7E57] font-semibold text-center pb-1">
                                {day}
                              </Calendar.HeaderCell>
                            )}
                          </Calendar.GridHeader>
                          <Calendar.GridBody>
                            {(date) => (
                              <Calendar.Cell
                                date={date}
                                className="text-xs text-center rounded-lg p-1.5 text-[#2C1F0E]
                                           hover:bg-[#F5EDD8] cursor-pointer transition-colors
                                           data-[selected]:bg-[#2C1F0E] data-[selected]:text-[#F5EDD8]
                                           data-[selected]:font-bold data-[disabled]:opacity-30
                                           data-[disabled]:cursor-not-allowed data-[disabled]:hover:bg-transparent"
                              />
                            )}
                          </Calendar.GridBody>
                        </Calendar.Grid>
                      </Calendar>
                    </div>
                    {bookingDate && (
                      <p className="text-xs text-[#9C7E57] text-center">
                        Selected:{" "}
                        <span className="font-semibold text-[#2C1F0E]">
                          {bookingDate.toString()}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* Time Dropdowns */}
                  <div className="flex flex-col gap-5 flex-1 justify-center">

                    {/* Start Time */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-[#9C7E57]" />
                        <span className="text-sm font-semibold text-[#3B2F1E]">
                          Start Time
                        </span>
                      </div>
                      <div className="relative">
                        <select
                          value={startTime}
                          onChange={(e) => {
                            setStartTime(e.target.value);
                            setEndTime("");
                          }}
                          className="w-full appearance-none px-4 py-3 rounded-xl border border-[#DDD5C4] bg-[#FDFAF5] text-[#2C1F0E] text-sm focus:outline-none focus:border-[#C9A96E] transition-colors cursor-pointer"
                        >
                          <option value="" disabled>Select start time</option>
                          {TIME_SLOTS.map((slot) => {
                            const disabled = isSlotDisabled(slot);
                            return (
                              <option
                                key={slot}
                                value={slot}
                                disabled={disabled}
                                className={disabled ? "text-gray-300" : ""}
                              >
                                {slot}{disabled ? " (passed)" : ""}
                              </option>
                            );
                          })}
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9C7E57]">
                          ▾
                        </div>
                      </div>
                      {isToday && (
                        <p className="text-xs text-[#B0A898]">
                          Showing available slots from {currentHour + 1}:00 onwards
                        </p>
                      )}
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center justify-center">
                      <span className="text-[#C9A96E] font-bold text-xl">↓</span>
                    </div>

                    {/* End Time */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-[#9C7E57]" />
                        <span className="text-sm font-semibold text-[#3B2F1E]">
                          End Time
                        </span>
                      </div>
                      <div className="relative">
                        <select
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          disabled={!startTime}
                          className="w-full appearance-none px-4 py-3 rounded-xl border border-[#DDD5C4] bg-[#FDFAF5] text-[#2C1F0E] text-sm focus:outline-none focus:border-[#C9A96E] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <option value="" disabled>Select end time</option>
                          {getEndTimeOptions().map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9C7E57]">
                          ▾
                        </div>
                      </div>
                      {!startTime && (
                        <p className="text-xs text-[#B0A898]">
                          Select start time first
                        </p>
                      )}
                    </div>

                    {/* Summary */}
                    {totalHours && (
                      <div className="bg-[#F5EDD8] rounded-xl px-4 py-3 text-center">
                        <p className="text-xs text-[#9C7E57]">Duration</p>
                        <p className="text-lg font-bold text-[#2C1F0E]">
                          {startTime} → {endTime}
                        </p>
                        <p className="text-sm text-[#C9A96E] font-semibold">
                          {totalHours} hr{totalHours > 1 ? "s" : ""} · ${totalCost}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Modal.Body>

              {/* Footer */}
              <Modal.Footer className="border-t border-[#EDE5D8] pt-4 flex gap-3">
                <Button
                  onPress={() => setIsOpen(false)}
                  className="flex-1 border border-[#DDD5C4] bg-transparent text-[#2C1F0E] font-semibold rounded-xl hover:bg-[#F5EDD8] transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  onPress={handleBooking}
                  isDisabled={!bookingDate || !startTime || !endTime}
                  className="flex-1 bg-[#2C1F0E] text-[#F5EDD8] font-semibold rounded-xl hover:bg-[#3D2B13] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default BookNowModal;