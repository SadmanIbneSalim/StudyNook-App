import { Button, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function RoomCard({ data }) {
  const { _id, image, name, description, floor, capacity, rate, amenities } =
    data;

  // Short description
  const shortDescription =
    description.length > 100 ? description.slice(0, 100) + "..." : description;

  // Show only first 3 amenities
  const visibleAmenities = amenities.slice(0, 3);
  const remainingCount = amenities.length - 3;

  return (
    <div className="card bg-base-100 shadow-xl border flex flex-col justify-between h-full border-gray-200">
      {/* Room Image */}
      <figure className="h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={500}
          height={250}
          className=" object-cover"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body">
        {/* Room Name */}
        <h2 className="card-title text-2xl font-bold">{name}</h2>

        {/* Description */}
        <p className="text-gray-600">{shortDescription}</p>

        {/* Info */}
        <div className="space-y-1 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Floor:</span> Floor {floor}
          </p>

          <p>
            <span className="font-semibold">Capacity:</span> {capacity}
          </p>

          <p>
            <span className="font-semibold">Rate:</span> ${rate}/hr
          </p>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-3">
          {visibleAmenities.map((item, index) => (
            <Chip variant="default" key={index} className="badge badge-outline px-3 py-3">
              {item}
            </Chip>
          ))}

          {remainingCount > 0 && (
            <span className="badge badge-neutral px-3 py-3">
              +{remainingCount} more
            </span>
          )}
        </div>

        {/* Button */}

        <div className="mt-auto pt-5">
        <Button className="card-actions my-5 ">
          <Link href={`/rooms/${_id}`} className="btn btn-primary">
            View Details
          </Link>
        </Button>
      </div>
    </div>
    </div>
  );
}
