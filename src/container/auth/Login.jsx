import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BeatLoader } from 'react-spinners';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { FaUserCheck } from 'react-icons/fa';

const commonDivStyle = 'flex flex-col my-2';
const commonInputStyle = 'outline-none border-[0.5px] border-white hover:border-blue-300 py-2 px-3 rounded-md transition-all duration-200 ease-linear';

const url = 'http://localhost:5000/api/auth-user';

export default function Login() {
  const navigate = useNavigate();
  const [authId, setAuthId] = useState("");
  const [password, setPassword] = useState("");

  const [fields, setFields] = useState(false);

  const [loading, setLoading] = useState(false);
  const [userDoesNotExists, setUserDoesNotExists] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  const validateUser = async () => {

    const headers = {
      'Content-Type': 'application/json',
      'authId': authId,
      'password': password,
    };
    try {
      setLoading(true);
      const response = await axios.get(url, { headers: headers });

      if (response.data.success) {
        const { userExists } = response.data;
        setLoading(false);
        if (userExists) {
          setUserAuthenticated(true);
          localStorage.setItem("TakeYourMedicineAuth", response.data.authToken);
          setTimeout(() => {
            navigate("/")
          }, 3000);
        } else {
          setUserDoesNotExists(true);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      }

    } catch (error) {
      setUserDoesNotExists(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  const handleSubmit = () => {
    if (!authId.replace(" ", "").length || password.replace(" ", "").length < 6) {
      setFields(true);
    } else {
      validateUser();
    }
  }


  if (localStorage.getItem("TakeYourMedicineAuth")) {
    const currentLocation = window.location.href;

    if (currentLocation == "http://localhost:3000/login") {
      window.location.href = "http://localhost:3000/"
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center h-[60vh] w-full animate-fade-in transition-all duration-300 ease-linear'>
        <div className='flex flex-col items-center justify-center animate-fade-in duration-200 ease-in'>
          <BeatLoader size={30} color='blue' speedMultiplier={2} />
        </div>
      </div>
    )
  }
  if (userDoesNotExists || userAuthenticated) {
    return (
      <div className='flex items-center justify-center h-[60vh] w-full animate-fade-in transition-all duration-300 ease-linear'>
        {userDoesNotExists && (
          <div className='flex flex-col items-center justify-center animate-fade-in duration-200 ease-in'>
            <FaUserCheck fontSize={50} color='yellow' />
            <p className='text-black text-xl font-bold text-center'>User does not exist or internal Server Error!</p>
          </div>
        )}
        {userAuthenticated && (
          <div className='flex flex-col items-center justify-center animate-fade-in duration-200 ease-in'>
            <IoCheckmarkDoneCircleSharp fontSize={50} color='green' />
            <p className='text-green-600 text-xl font-bold text-center'>User Authenticated</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='flex items-center justify-center h-full w-full animate-fade-in transition-all duration-300 ease-linear'>
      <div className='w-1/3 max-lg:w-1/2 max-md:w-5/6 max-sm:w-11/12'>
        <h1 className='text-black text-3xl font-bold'>Login here</h1>
        <div className='my-4 px-2'>

          <div className={commonDivStyle}>
            <p className='text-semibold'>Email or Contact no<span className='text-red-500'>*</span></p>
            <input type='text' className={commonInputStyle} placeholder='Input your credential' onChange={(e) => setAuthId(e.target.value)} />
            {fields && authId.replace(" ", "").length < 5 && (<p className='text-red-500 animate-fade-in duration-200'>Enter valid Credential!</p>)}
          </div>

          <div className={commonDivStyle}>
            <p className='text-semibold'>Password<span className='text-red-500'>*</span></p>
            <input type='password' className={commonInputStyle} placeholder='Input your password' onChange={(e) => setPassword(e.target.value)} />
            {fields && password.replace(" ", "").length < 6 && (<p className='text-red-500 animate-fade-in duration-200'>Enter valid password!</p>)}
          </div>

          <div className={commonDivStyle}>
            <button
              type='button'
              className='py-2 px-3 bg-blue-600 hover:bg-blue-500 rounded-md transition-all duration-300 ease-linear text-white'
              onClick={handleSubmit}
              disabled={loading}
            >
              Login here!
            </button>
          </div>
          <div className={`flex items-center gap-2 max-md:hidden`}>
            <p>New user?</p>
            <Link
            to={"/signup"}
            className='text-blue-600 underline cursor-pointer hover:text-blue-500 transition-all duration-200 ease-linear'
            >
              Register now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
