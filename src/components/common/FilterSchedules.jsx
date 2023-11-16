import React, { useEffect, useState } from 'react';

import { FaSearchengin } from "react-icons/fa6";


export default function FilterSchedules({
   originalScheduleList,
   setMySchedules,
   handleSearchTerm
}) {
   const [isFilter, setIsFilter] = useState('all');
   const [searchTerm, setSearchTerm] = useState("");
 

   // Two array for search checks
   const [badgeFilterArray, setBadgeFilterArray] = useState([]);
   const [searchFilterArray, setSearchFilterArray] = useState([]);

  const findCommonElements = ({ arr1, arr2 }) => {
   const idsSet = new Set(arr1.map(obj => obj._id));

   return arr2.filter(obj => idsSet.has(obj._id));
 };

 const searchedSchedule = (data) => {
   const newList = originalScheduleList.filter((schedule) => {
     return (
       schedule.patient?.name?.toLowerCase().includes(data.toLowerCase()) ||
       schedule.caretaker?.name?.toLowerCase().includes(data.toLowerCase()) ||
       schedule?.medicineNames?.toLowerCase().includes(data.toLowerCase())
     );
   });
   return newList;
 };

 useEffect(() => {
   filterList(searchTerm);
 }, [searchTerm])

 const filterList = (data) => {
   const trimmedSearchTerm = data.trim();
   if (data === 'running' || data === 'completed') {

     const newList = originalScheduleList.filter(({ courseStatus }) => {
       return courseStatus == data;
     });
     setBadgeFilterArray(newList);

     if (searchTerm.trim() !== "") {
       const newArray = findCommonElements({ arr1: searchFilterArray, arr2: newList });
       setMySchedules(newArray)
     } else {
       setMySchedules(newList);
     }

   } else {

     if (data === 'all') {
       setBadgeFilterArray(originalScheduleList);
       if (searchTerm.trim() !== "") {
         setMySchedules(searchFilterArray)
       } else {
         setMySchedules(originalScheduleList);
       }

     } else if (trimmedSearchTerm !== "") {
       const newArray = searchedSchedule(data);
       setSearchFilterArray(newArray);

       if (isFilter === 'running' || isFilter === 'completed') {
         const finalArray = findCommonElements({ arr1: badgeFilterArray, arr2: newArray });
         setMySchedules(finalArray);
       } else {
         setMySchedules(newArray);
       }
     }
   }
 }

 useEffect(()=>{
   handleSearchTerm(searchTerm)
 }, [setSearchTerm])


   return (
      <div className='flex gap-2 md:gap-4 w-full justify-between my-3 max-sm:flex-col-reverse'>
        <div className='flex items-center border-[1px] border-white hover:border-blue-300 rounded-md'>
          <div className='bg-white py-1 px-2 rounded-l-md'>
            <FaSearchengin fontSize={24} />
          </div>
          <input type='text' onChange={(e) => setSearchTerm(e.target.value)} className='py-1 px-2 outline-none  rounded-r-md transition-all duration-200 ease-linear  max-sm:w-full' placeholder='Search here...' />
        </div>
        <div className='flex gap-2'>
          <button
            type='button'
            className={`py-1 px-2 cursor-pointer bg-white hover:bg-gray-100 transition-all duration-200 ease-in text-yellow-600 rounded-md ${isFilter === 'all' && 'bg-gray-100'}`}
            onClick={() => {
              filterList('all')
              setIsFilter('all')
            }}
          >All</button>
          <button
            type='button'
            className={`py-1 px-2 cursor-pointer bg-white hover:bg-gray-100 transition-all duration-200 ease-in text-red-600 rounded-md ${isFilter === 'running' && 'bg-gray-100'}`}
            onClick={() => {
              setIsFilter('running')
              filterList('running')
            }}
          >Running</button>
          <button
            type='button'
            className={`py-1 px-2 cursor-pointer bg-white hover:bg-gray-100 transition-all duration-200 ease-in text-green-600 rounded-md ${isFilter === 'completed' && 'bg-gray-100'}`}
            onClick={() => {
              setIsFilter('completed')
              filterList('completed')
            }}
          >Completed</button>
        </div>
      </div>
   )
}
