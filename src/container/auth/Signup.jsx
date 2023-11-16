import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import generateRandom6DigitNumber from '../../utils/randomNumber';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import {FaUserCheck} from 'react-icons/fa';

const generateEmailOTP = generateRandom6DigitNumber().toString();
const generatePhoneOTP = generateRandom6DigitNumber().toString();
console.log(generateEmailOTP, generatePhoneOTP);

const commonDivStyle = 'flex flex-col my-2';
const commonInputStyle = 'outline-none border-[0.5px] border-white hover:border-blue-300 py-2 px-3 rounded-md transition-all duration-200 ease-linear';
const notActiveStyle = 'py-2 px-3 rounded-md border-none bg-white text-black font-semibold cursor-pointer transition-all duration-300 ease-in-out';
const activeStyle = 'py-2 px-3 rounded-md border-none font-semibold bg-blue-600 text-white cursor-pointer transition-all duration-300 ease-in-out';

const url = 'http://localhost:5000/api/create-user';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [fields, setFields] = useState(false);
  const [OTPsent, setOTPsent] = useState(false);

  const [emailOTP, setEmailOTP] = useState("");
  const [mobileOTP, setMobileOTP] = useState("");

  const [wrongOTP, setWrongOTP] = useState("none");
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const handleCredentials = () => {
    if (!name || !email || !contactNo || !password || !role) {
      setFields(true);
    } else {
      setOTPsent(true);
    }
  }
  
  const saveData = async () => {
    const data = { name, email, contactNo, password, role }
    setLoading(true)
    try {
      axios.post(url, data)
        .then((response) => {
          setLoading(false);
          if (response.data.success) {
            const {status} = response.data;

            if ( status === 'userexist' ){
              setUserExists(true);
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            } else {
              setUserCreated(true);
              localStorage.setItem("TakeYourMedicineAuth", response.data.authToken)
              setTimeout(() => {
                navigate("/")
              }, 3000);
            }
          } else {
            setUserExists(true);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        })
    } catch (error) {
      setUserExists(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  const handleSubmit = () => {
    if (generateEmailOTP !== emailOTP) {
      setWrongOTP('emailotp');
    } else if (generatePhoneOTP !== mobileOTP) {
      setWrongOTP('mobileotp')
    } else {
      setSubmitted(true);
      saveData();
    }
  }

  if (localStorage.getItem("TakeYourMedicineAuth")) {
    const currentLocation = window.location.href;

    if (currentLocation == "http://localhost:3000/signup") {
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
  if (userCreated || userExists) {
    return (
      <div className='flex items-center justify-center h-[60vh] w-full animate-fade-in transition-all duration-300 ease-linear'>
        {userExists && (
          <div className='flex flex-col items-center justify-center animate-fade-in duration-200 ease-in'>
          <FaUserCheck fontSize={50} color='yellow'  />
          <p className='text-black text-xl font-bold text-center'>User already exist or internal Server Error!</p>
          </div>
        )}
        {userCreated && (
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
        <h1 className='text-black text-3xl font-bold'>Register here</h1>
        <div className='my-4 px-2'>

          <div className={commonDivStyle}>
            <p className='text-semibold'>Name<span className='text-red-500'>*</span></p>
            <input type='text' className={commonInputStyle} placeholder='Input your full-name' onChange={(e) => setName(e.target.value)} />
            {fields && name.replace(" ", "").length < 2 && (<p className='text-red-500 animate-fade-in duration-200'>Atleast contain 2 characters!</p>)}
          </div>

          <div className={commonDivStyle}>
            <p className='text-semibold'>Email<span className='text-red-500'>*</span></p>
            <input type='email' className={commonInputStyle} placeholder='Input your email' onChange={(e) => setEmail(e.target.value)} />
            {fields && email.replace(" ", "").length < 5 && (<p className='text-red-500 animate-fade-in duration-200'>Enter valid email!</p>)}
          </div>

          <div className={commonDivStyle}>
            <p className='text-semibold'>Contact No<span className='text-red-500'>*</span></p>
            <input type='number' className={commonInputStyle} placeholder='Input your contact no' onChange={(e) => setContactNo(e.target.value)} />
            {fields && contactNo.replace(" ", "").length < 10 && (<p className='text-red-500 animate-fade-in duration-200'>Enter valid mobile no!</p>)}
          </div>

          <div className={commonDivStyle}>
            <p className='text-semibold'>What do you want?<span className='text-red-500'>*</span></p>
            <div className='flex justify-between'>
              <span className={role === 'caretaker' ? activeStyle : notActiveStyle} onClick={() => setRole('caretaker')}>Care taker</span>

              <span className={role === 'patient' ? activeStyle : notActiveStyle} onClick={() => setRole('patient')}>Healer</span>
            </div>
            {fields && !role && (<p className='text-red-500 animate-fade-in duration-200'>Select role!</p>)}
          </div>

          <div className={commonDivStyle}>
            <p className='text-semibold'>Password<span className='text-red-500'>*</span></p>
            <input type='password' className={commonInputStyle} placeholder='Input your password' onChange={(e) => setPassword(e.target.value)} />
            {fields && password.replace(" ", "").length < 6 && (<p className='text-red-500 animate-fade-in duration-200'>Atleast contain 6 characters!</p>)}
          </div>

          {OTPsent && (
            <div className={`${commonDivStyle} animate-fade-in duration-200 ease-linears`}>
              <div className={commonDivStyle}>
                <p className='text-blue-500'>OTP sent on {email}</p>
                <input type='text' className={`${commonInputStyle} text-center border-[0.5px] border-gray-300`} onChange={(e) => setEmailOTP(e.target.value)} />
                {wrongOTP === "emailotp" && (
                  <p className='text-red-500 animate-fade-in duration-200'>Wrong email OTP!</p>
                )}
              </div>

              <div className={commonDivStyle}>
                <p className='text-blue-500'>OTP sent on {contactNo}</p>
                <input type='text' className={`${commonInputStyle} border-[0.5px] border-gray-300 text-center`} onChange={(e) => setMobileOTP(e.target.value)} />
                {wrongOTP === "mobileotp" && (
                  <p className='text-red-500 animate-fade-in duration-200'>Wrong mobile OTP!</p>
                )}
              </div>
            </div>
          )}

          <div className={`${commonDivStyle} mt-3`}>
            <button
              type='button'
              className='py-2 px-3 bg-blue-600 hover:bg-blue-500 rounded-md transition-all duration-300 ease-linear text-white'
              onClick={!OTPsent ? handleCredentials : handleSubmit}
              disabled={submitted}
            >
              {!OTPsent ? 'Verify Credentials!' : 'Submit'}
            </button>
          </div>
          <div className={`flex items-center gap-2 max-md:hidden`}>
            <p>Already a user?</p>
            <Link
            to={"/login"}
            className='text-blue-600 underline cursor-pointer hover:text-blue-500 transition-all duration-200 ease-linear'
            >
              Login now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}