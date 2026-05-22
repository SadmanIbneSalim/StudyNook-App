
import RoomCard from '@/components/Card';
import Card from '@/components/Card';
import RoomFilter from '@/components/Filter';
import React from 'react';

const RoomPage = async() => {

    const res=await fetch("http://localhost:2001/rooms");
    const roomData=await res.json()
    console.log(roomData);

    return (
        <div className='bg-[#F5EDD8]'>
            <div className='max-w-7xl mx-auto '>
                <h1 className="text-3xl font-bold text-[#2C1F0E] font-serif pt-5">
          All Study Rooms
        </h1>
        <h1 className="text-xl font-bold text-[#2C1F0E] font-serif mb-6">
         Browse all available rooms across the library
        </h1>
            
           

            <RoomFilter roomData={roomData}/>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5 gap-3">
               { 
               roomData.map(data=> <RoomCard key={data._id} data={data}></RoomCard>)
               }
            </div> */}

            </div>

        </div>
    );
};

export default RoomPage;