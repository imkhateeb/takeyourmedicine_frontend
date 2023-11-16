import React, { useState, useEffect } from 'react';

import { ImCross } from 'react-icons/im';
import { BeatLoader } from 'react-spinners';

import Login from '../../container/auth/Login';
import Signup from '../../container/auth/Signup';
import axios from 'axios';
import { Link } from 'react-router-dom';

const url = 'http://localhost:5000/api/get-user';
const commonBtnStyle = 'py-2 px-4 cursor-pointer transition-all duration-200 ease-linear w-5/6 rounded-md';

export default function Rightbar({ handleRightSidebar }) {

  const [alreadyUser, setAlreadyUser] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("TakeYourMedicineAuth");
    fetchUser(localStorage.getItem("TakeYourMedicineAuth"))
  }

  const fetchUser = (token) => {
    if (!token) {
      setUser(null);
      setLoading(false); // Add this line
      return;
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    };
    try {
      axios.get(url, { headers: headers })
        .then((response) => {
          setUser(response.data.user);
          setLoading(false); // Add this line
        });
    } catch (error) {
      console.log("Error while getting the user", error);
      setLoading(false); // Add this line
    }
  };

  useEffect(() => {
    setLoading(true);
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
  if ( user === null ) {
    return (
      <div className='w-full'>
        <div className='w-full flex items-center justify-between my-4 px-4'>
          <ImCross fontSize={30} className='font-bold text-green-800 cursor-pointer' onClick={handleRightSidebar} />
        </div>
        <div className='w-full mt-24'>
          {alreadyUser ? (
            <Signup />
          ) : (
            <Login />
          )}

          {alreadyUser ? (
            <div className='px-5'>
              <p className='text-center'>Already a user? <span onClick={() => setAlreadyUser(!alreadyUser)} className='text-blue-600 underline cursor-pointer hover:text-blue-500 transition-all duration-200 ease-linear'>Login here!</span> </p>
            </div>
          ) : (
            <div className='px-5'>
              <p className='text-center'>Not a user? <span onClick={() => setAlreadyUser(!alreadyUser)} className='text-blue-600 underline cursor-pointer hover:text-blue-500 transition-all duration-200 ease-linear'>Register here!</span> </p>
            </div>
          )}
        </div>
      </div>
    )
  } 
  if ( user ) {
    return (
      <div className='w-full'>
        <div className='w-full flex items-center justify-between my-4 px-4'>
          <ImCross fontSize={30} className='font-bold text-green-800 cursor-pointer' onClick={handleRightSidebar} />
        </div>
        <div className='fixed bottom-5 w-full'>
        {!user ? (
          <div className='flex gap-3 justify-center'>
            <Link
              className={`${commonBtnStyle} text-center bg-blue-600 w-[100px] hover:bg-blue-500 text-white`}
              to="/login"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className={`${commonBtnStyle} text-center text-blue-600 w-[100px] hover:text-blue-500`}
            >
              Signup
            </Link>
          </div>
        ) : (
          <div className='flex gap-3 justify-center'>
            {!isLoggingOut ? (
              <button
                className={`${commonBtnStyle} bg-red-500 hover:bg-red-400 text-white w-[100px] text-center`}
                onClick={() => setIsLoggingOut(true)}
              >
                Logout
              </button>
            ) : (
              <div className='flex gap-3 justify-center'>
                <button
                  className={`${commonBtnStyle} bg-yellow-400 hover:bg-yellow-300 w-[100px] text-black`}
                  onClick={handleLogout}
                >
                  Confirm
                </button>
                <button
                  className={`${commonBtnStyle} text-yellow-700 hover:text-yellow-600 w-[100px]`}
                  onClick={()=>setIsLoggingOut(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

      </div>
      </div>
    )
  }
}
