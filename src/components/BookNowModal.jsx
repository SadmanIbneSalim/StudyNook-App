"use client";

import { authClient } from "@/lib/auth-client";
import { Clock, Calendar, Rocket } from "@gravity-ui/icons";
import {
  Button,
  DateField,
  Description,
  Label,
  Modal,
  TimeField,
} from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";


const BookNowModal = ({ data }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookingDate, setBookingDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Calculate total hours between start and end time
  const calculateHours = () => {
    if (!startTime || !endTime) return null;
    const diff = endTime.hour - startTime.hour;
    return diff > 0 ? diff : null;
  };

  const totalHours = calculateHours();
  const totalCost = totalHours ? totalHours * data?.rate : null;

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
    bookingDate: bookingDate ? new Date(bookingDate) : null,
    startTime: startTime
      ? `${String(startTime.hour).padStart(2, "0")}:00`
      : null,
    endTime: endTime
      ? `${String(endTime.hour).padStart(2, "0")}:00`
      : null,
    totalHours: totalHours || null,
    totalCost: totalCost || null,
    status: "pending", 
  };

  const res = await fetch(`http://localhost:2001/booking`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(bookingData),
  });


  if (res.status === 409) {
    const error = await res.json();
    toast.error(error.message, {
      position: "top-center",
      autoClose: 5000,
    });
    return; 
  }

  
  if (res.ok) {
    toast.success("Room booked successfully!", {
      position: "top-center",
    });
 
    document.querySelector("[data-slot='close-trigger']")?.click();
  }
};

  return (
    <div>
      <Modal>
        {/* Trigger Button */}
        <Button
          className="w-full font-bold text-[#F5EDD8] bg-[#2C1F0E] hover:bg-[#3D2B13] transition-all duration-200"
          size="lg"
          radius="md"
        >
          Book Now
        </Button>

        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-lg">
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
                      <span className="text-sm font-normal text-[#9C7E57] ml-1">
                        / hour
                      </span>
                    </p>
                  </div>

                  {/* Live Cost Preview */}
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

                {/* Date Field */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="size-4 text-[#9C7E57]" />
                    <span className="text-sm font-semibold text-[#3B2F1E]">
                      Select Date
                    </span>
                  </div>
                  <DateField
                    onChange={setBookingDate}
                    name="date"
                    className="w-full"
                  >
                    <Label className="sr-only">Date</Label>
                    <DateField.Group className="w-full px-4 py-3 rounded-xl border border-[#DDD5C4] bg-[#FDFAF5] text-[#2C1F0E] text-sm focus-within:border-[#C9A96E] transition-colors">
                      <DateField.Input>
                        {(segment) => (
                          <DateField.Segment
                            segment={segment}
                            className="text-[#2C1F0E] focus:bg-[#F5EDD8] focus:rounded px-0.5 outline-none"
                          />
                        )}
                      </DateField.Input>
                    </DateField.Group>
                  </DateField>
                </div>

                {/* Time Fields Row */}
                <div className="flex gap-4">
                  {/* Start Time */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="size-4 text-[#9C7E57]" />
                      <span className="text-sm font-semibold text-[#3B2F1E]">
                        Start Time
                      </span>
                    </div>
                    <TimeField
                      granularity="hour"
                      onChange={setStartTime}
                      name="time"
                      className="w-full"
                    >
                      <Label className="sr-only">Start time</Label>
                      <TimeField.Group className="w-full px-4 py-3 rounded-xl border border-[#DDD5C4] bg-[#FDFAF5] text-[#2C1F0E] text-sm focus-within:border-[#C9A96E] transition-colors">
                        <TimeField.Input>
                          {(segment) => (
                            <TimeField.Segment
                              segment={segment}
                              className="text-[#2C1F0E] focus:bg-[#F5EDD8] focus:rounded px-0.5 outline-none"
                            />
                          )}
                        </TimeField.Input>
                      </TimeField.Group>
                      <Description className="text-xs text-[#B0A898] mt-1">
                        Enter start hour
                      </Description>
                    </TimeField>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center pt-8">
                    <span className="text-[#C9A96E] font-bold text-lg">→</span>
                  </div>

                  {/* End Time */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="size-4 text-[#9C7E57]" />
                      <span className="text-sm font-semibold text-[#3B2F1E]">
                        End Time
                      </span>
                    </div>
                    <TimeField
                      granularity="hour"
                      onChange={setEndTime}
                      name="end-time"
                      className="w-full"
                    >
                      <Label className="sr-only">End time</Label>
                      <TimeField.Group className="w-full px-4 py-3 rounded-xl border border-[#DDD5C4] bg-[#FDFAF5] text-[#2C1F0E] text-sm focus-within:border-[#C9A96E] transition-colors">
                        <TimeField.Input>
                          {(segment) => (
                            <TimeField.Segment
                              segment={segment}
                              className="text-[#2C1F0E] focus:bg-[#F5EDD8] focus:rounded px-0.5 outline-none"
                            />
                          )}
                        </TimeField.Input>
                      </TimeField.Group>
                      <Description className="text-xs text-[#B0A898] mt-1">
                        Enter end hour
                      </Description>
                    </TimeField>
                  </div>
                </div>

                
                {startTime && endTime && endTime.hour <= startTime.hour && (
                  <p className="text-xs text-red-500 bg-red-50 px-4 py-2 rounded-lg border border-red-100">
                    End time must be after start time.
                  </p>
                )}
              </Modal.Body>

              {/* Footer */}
              <Modal.Footer className="border-t border-[#EDE5D8] pt-4 flex gap-3">
                <Button
                  slot="close"
                  className="flex-1 border border-[#DDD5C4] bg-transparent text-[#2C1F0E] font-semibold rounded-xl hover:bg-[#F5EDD8] transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBooking}
                //   slot="close"
                  isDisabled={
                    !bookingDate ||
                    !startTime ||
                    !endTime ||
                    endTime.hour <= startTime.hour
                  }
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