import Image from "next/image";
import Link from "next/link";

export default function RoomCard({ data }) {
  const { _id, image, name, description, floor, capacity, rate, amenities } = data;

  const shortDescription =
    description.length > 100 ? description.slice(0, 100) + "..." : description;

  const visibleAmenities = amenities.slice(0, 3);
  const remainingCount = amenities.length - 3;

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">
      
      {/* Image */}
      <div className=" h-48 ">
        <Image
          src={image}
          alt={name}
          
          width={500}
          height={300}
          className="object-cover object-center"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">

        <h2 className="text-xl font-bold text-gray-800">{name}</h2>

        <p className="text-gray-500 text-sm">{shortDescription}</p>

        <div className="space-y-1 text-sm text-gray-700">
          <p><span className="font-semibold">Floor:</span> Floor {floor}</p>
          <p><span className="font-semibold">Capacity:</span> {capacity}</p>
          <p><span className="font-semibold">Rate:</span> ${rate}/hr</p>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {visibleAmenities.map((item, index) => (
            <span
              key={index}
              className="text-xs border border-gray-300 text-gray-600 rounded-full px-3 py-1"
            >
              {item}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1">
              +{remainingCount} more
            </span>
          )}
        </div>

        {/* Button — সবসময় নিচে */}
        <div className="mt-auto flex-1 pt-3">
          <Link
            href={`/rooms/${_id}`}
            className="block w-full text-center bg-gray-800 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
}