import React, { useEffect, useState } from 'react';
import LoginImage from '../assets/images/login3d.png';
import AddScheduleImage from '../assets/images/addschedule3d.png';
import { BeatLoader } from 'react-spinners';

import { Link } from 'react-router-dom';

const commonBtnStyle = 'py-2 px-4 cursor-pointer transition-all duration-200 ease-linear w-5/6 rounded-md';
const url = 'http://localhost:5000/api/get-user';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("TakeYourMedicineAuth");
    window.location.reload();
  }

  const fetchUser = async (token) => {
    if (!token) {
      setUser(null);
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data?.user)
      } else {
        console.log("Error while getting the user");
        console.error(await response.text());
      }
      setLoading(false);
    } catch (error) {
      console.log("Error while getting the user", error);
    }
  };

  useEffect(() => {

    setLoading(true)
    if (localStorage.getItem("TakeYourMedicineAuth")) {
      fetchUser(localStorage.getItem("TakeYourMedicineAuth"));
    } else {
      setLoading(false)
    }
  }, []);


  if (loading) {
    return (
      <div className='flex items-center justify-center h-[60vh] w-full animate-fade-in transition-all duration-300 ease-linear'>
        <div className='flex flex-col items-center justify-center animate-fade-in duration-200 ease-in'>
          <BeatLoader size={30} color='blue' speedMultiplier={2} />
        </div>
      </div>
    )
  }

  return (
    <div className='w-full flex items-center justify-center'>
      <div className='w-1/3 max-md:w-5/6 max-sm:w-11/12 py-6 px-3 flex flex-col items-center justify-center'>
        {user ? (
          <div className='flex flex-col gap-1'>
          <h1 className='text-green-800 text-5xl font-bold max-sm:text-3xl'>Hi {user?.name}</h1>
          <h1 className='text-green-700 text-3xl font-bold max-sm:text-2xl'>Welcome to takeYourMedicine</h1>
          <p className='text-lg text-gray-400'>powered by AMRUTAM Ayurveda</p>
          </div>
        ) : (
          <div className='flex flex-col gap-1'>
          <h1 className='text-green-800 text-5xl font-bold max-sm:text-3xl'>Hi User</h1>
          <h1 className='text-green-700 text-3xl font-bold max-sm:text-2xl'>Welcome to takeYourMedicine</h1>
          <p className='text-lg text-gray-400'>powered by AMRUTAM Ayurveda</p>
          </div>
        )}
        <img
          src={!user ? LoginImage : AddScheduleImage}
          alt='caring-img'
          className='w-5/6'
        />

        {user ? (
          <>
            <div className='w-full flex flex-col gap-3 justify-center items-center'>
              {user?.role === 'caretaker' &&
                <>
                  <Link to={`/medicine/request-list`} className={`bg-yellow-300 hover:bg-yellow-200 text-black ${commonBtnStyle} flex items-center justify-center`}>Request List</Link>
                  <Link to={`/caretaker/my-patient-list`} className={`bg-yellow-300 hover:bg-yellow-200 text-black ${commonBtnStyle} flex items-center justify-center`}>My Pateint List</Link>
                </>
              }
            </div>

            <div className='w-full flex flex-col gap-3 justify-center items-center'>
              {user?.role === 'patient' &&
                <>
                  <Link to={`/medicine/add-schedule`} className={`bg-yellow-300 hover:bg-yellow-200 text-black ${commonBtnStyle} flex items-center justify-center`}>Request helper</Link>
                  <Link to={`/patient/my-medicine-schedules`} className={`bg-yellow-300 hover:bg-yellow-200 text-black ${commonBtnStyle} flex items-center justify-center`}>My Medicine Schedules</Link>
                </>
              }
            </div>
          </>
        ) : (
          <div className='w-full flex flex-col gap-3 justify-center items-center'>
            <Link
              to="/login"
              className={`bg-blue-600 hover:bg-blue-500 text-white ${commonBtnStyle} text-center`}
            >Login here!</Link>
            <Link
              to="/signup"
              className={`bg-blue-600 hover:bg-blue-500 text-white ${commonBtnStyle} text-center`}
            >Signup!</Link>
          </div>
        )}
      </div>

      <div className='flex gap-3 fixed bottom-2 right-2'>
        {(!isLoggingOut && user) && (
          <button
            className={`${commonBtnStyle} bg-red-500 hover:bg-red-400 text-white w-[100px] text-center`}
            onClick={() => setIsLoggingOut(true)}
          >
            Logout
          </button>
        )} 
        
        {(isLoggingOut && user) && (
          <div className='flex gap-3 justify-center'>
            <button
              className={`${commonBtnStyle} bg-yellow-400 hover:bg-yellow-300 w-[100px] text-black`}
              onClick={handleLogout}
            >
              Confirm
            </button>
            <button
              className={`${commonBtnStyle} text-yellow-700 hover:text-yellow-600 w-[100px]`}
              onClick={() => setIsLoggingOut(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
