import Image from 'next/image';
import { Button, Chip } from '@heroui/react';
import { div } from 'framer-motion/client';
import { ModalForm } from '@/components/modal';
import { DeleteData } from '@/components/delete';

export default async function DetailsPage({ params }) {
  const { roomId } = await params;

  const res = await fetch(`http://localhost:2001/rooms/${roomId}`, {
    cache: 'no-store',
  });
  const data = await res.json();

  return (
    <div className='bg-[#F5EDD8] '>

    <div className="max-w-7xl mx-auto py-10 px-5">
      <div className="grid md:grid-cols-2 py-10 gap-8 items-center">

        {/* Image */}
        <div className="bg-gray-100 h-20 p-5 rounded-xl">
          <Image
            width={600}
            height={600}
            src={data.image}
            alt={data.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Details */}
        <div>
          <h2 className="text-3xl font-bold mb-3">{data.name}</h2>

          <p className="text-gray-500 mb-2">
            Floor: <span className="font-semibold text-gray-700">{data.floor}</span>
          </p>

          <p className="text-gray-500 mb-2">
            Capacity: <span className="font-semibold text-gray-700">{data.capacity} guests</span>
          </p>

          <p className="text-xl font-bold text-orange-500 mb-3">
            $ {data.rate} / Hour
          </p>

          <p className="text-gray-600 mb-4">{data.description}</p>

          <div className="mb-5">
            
          </div>

          <Button
            className="w-full font-bold text-white `!bg-[#5a4a38]`"
            size="lg"
            radius="md"
          >
            Book Now
          </Button>

          <div className="flex gap-3 mt-3">
           <ModalForm data={data}></ModalForm>
           <DeleteData data={data}></DeleteData>
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}