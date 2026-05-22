import DataTable from "@/components/DataTable"; // নতুন table বানাবো
import { DeleteData } from "@/components/delete";
import { ModalForm } from "@/components/modal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

const MyListing = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  // শুধু এই user এর rooms fetch করো
  const res = await fetch(
    `http://localhost:2001/rooms/owner/${user?.id}`,
    { cache: "no-store" }
  );
  const myRooms = await res.json();

  return (
    <div className="bg-[#F5EDD8] min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2C1F0E] font-serif mb-6">
          My Listings
        </h1>
        {myRooms?.length === 0 ? (
          <p className="text-[#9C7E57]">তুমি এখনো কোনো room add করোনি।</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myRooms.map((room) => (
              <div key={room._id} className="bg-white rounded-2xl border border-[#E5D9C3] p-4">
                <Image src={room.image} alt="" height={50} width={50} className="w-full h-40 object-cover rounded-xl mb-3" />
                <h3 className="font-bold text-[#2C1F0E]">{room.name}</h3>
                <p className="text-sm text-[#9C7E57]">${room.rate}/hr</p>
                
                <div className="flex gap-2 mt-3">
                  <ModalForm data={room} />
                  <DeleteData data={room} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListing;