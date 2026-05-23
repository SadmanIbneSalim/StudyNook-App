import Image from "next/image";
import { Button, Chip } from "@heroui/react";
import { ModalForm } from "@/components/modal";
import { DeleteData } from "@/components/delete";

import BookNowModal from "@/components/BookNowModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "StudyNook | Study Room Details & Booking",
  description:
    " View detailed information about study rooms including seating capacity, amenities, pricing, and availability. Book your preferred time slot instantly. ",
};

export default async function DetailsPage({ params }) {
  const { roomId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  console.log(token);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${roomId}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();
  const isOwner = session?.user?.id === data.ownerId;

  return (
    <div className="min-h-screen bg-[#F5EDD8]">
      <div className="max-w-6xl mx-auto py-14 px-5">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#e0d4bc]">
            <Image
              width={900}
              height={900}
              src={data.image}
              alt={data.name}
              className="w-full h-[520px] object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            {/* Name */}
            <h2 className="text-4xl font-bold text-[#2e1f0e]">{data.name}</h2>

            {/* Floor & Capacity badges */}
            <div className="flex gap-3 flex-wrap">
              <Chip
                className="bg-[#efe3ca] text-[#5a4a38] border border-[#d4c4a8] font-medium"
                size="md"
              >
                🏢 Floor {data.floor}
              </Chip>
              <Chip
                className="bg-[#efe3ca] text-[#5a4a38] border border-[#d4c4a8] font-medium"
                size="md"
              >
                👥 {data.capacity} guests
              </Chip>
            </div>

            {/* Rate */}
            <p className="text-3xl font-bold text-orange-500">
              ${data.rate}
              <span className="text-base font-normal text-gray-400 ml-1">
                / Hour
              </span>
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-[#d4c4a8]" />

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm">
              {data.description}
            </p>

            {/* Amenities */}
            {data.amenities?.length > 0 && (
              <div className="flex flex-wrap mx-4 gap-2">
                {data.amenities.map((item, index) => (
                  <Chip
                    key={index}
                    size="sm"
                    className="bg-white text-[#5a4a38] border border-[#d4c4a8]"
                  >
                    {item}
                  </Chip>
                ))}
              </div>
            )}

            {/* Book Now */}

            <BookNowModal data={data}></BookNowModal>

            {/* Edit / Delete */}
            {isOwner && (
              <div className="flex gap-3">
                <ModalForm data={data} />
                <DeleteData data={data} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
