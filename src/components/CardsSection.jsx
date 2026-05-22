import { BiRightArrow } from "react-icons/bi";
import RoomCard from "./Card";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const CardsSection = async () => {
 
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, { cache: "no-store" ,});
    const roomData = await res.json();

    const latestRooms = [...roomData].reverse().slice(0, 6);

    return (
        <div className="bg-[#F5EDD8] pb-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-xl font-semibold text-center text-[#3B2F1E] py-8">Our Latest Rooms</h1>
                <div className="flex justify-end">
                    <div className="flex"><h1>see more <MdOutlineArrowRightAlt /></h1></div>
                </div>

                <div className="grid grid-cols-1 mx-4 md:grid-cols-2 lg:grid-cols-3 pt-5 gap-3">
                    {latestRooms.map(data => (
                        <RoomCard key={data._id} data={data} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardsSection;