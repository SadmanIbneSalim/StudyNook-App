
import RoomCard from '@/components/Card';
import Card from '@/components/Card';
import React from 'react';

const RoomPage = async() => {

    const res=await fetch("http://localhost:2001/rooms");
    const roomData=await res.json()
    console.log(roomData);

    return (
        <div className='bg-[#F5EDD8]'>
            <div className='max-w-7xl mx-auto '>
            <h1>All Study Rooms</h1>
            <p>Browse all available rooms across the library</p>

            <div className='grid grid-cols-3  gap-3 py-7 '>
               { 
               roomData.map(data=> <RoomCard key={data._id} data={data}></RoomCard>)
               }
            </div>

            </div>

        </div>
    );
};

export default RoomPage;