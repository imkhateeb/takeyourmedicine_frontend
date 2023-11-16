import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { IoMdCloudDone } from 'react-icons/io';
import { BeatLoader } from 'react-spinners';

import CreateScheduleAndSend from '../../utils/notificate/mainSender';

import { useNavigate } from 'react-router-dom';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';

const token = localStorage.getItem('TakeYourMedicineAuth');
const url = 'http://localhost:5000/api/accept-medicine-schedule';
const url2 = 'http://localhost:5000/api/complete-medicine-schedule';



export default function RequestCard({ patientName, caretaker, caretakerName, contactNo, whatsAppNo, email, courseStatus, medicineNames, from, to, times, postedAt, taken, requestId, careBy }) {
  const navigate = useNavigate();
  const [accepting, setAccepting] = useState(false);
  const [internalServerError, setInternalServerError] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [confirmAccept, setConfirmAccept] = useState(false);
  const [getDetails, setGetDetails] = useState(false);
  const [confirmComplete, setConfirmComplete] = useState(false);
  const [pushing, setPushing] = useState("");

  const headers = {
    'Content-Type': 'application/json',
    'token': token,
    'requestId': requestId,
  };
  

  const handlePush = (message) => {
    setPushing("pushing");
    CreateScheduleAndSend({to_name: patientName, to_email: email, message});
    setPushing('pushed')
  }
  const handleCompleteCourse = () => {
    setAccepting(true);
    axios.get(url2, {headers})
    .then((response)=>{
      if(response.data.success){
        window.location.reload();
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }


  const handleAccept = async () => {
    
    try {
      setAccepting(true);
      const response = await axios.get(url, { headers });

      setAccepted(true);
      setTimeout(() => {
        navigate("/caretaker/my-patient-list");
      }, 3000);
    } catch (error) {
      setAccepting(false);
      setInternalServerError(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  if (accepting) {
    return (
      <div className='p-3 sm:p-5 bg-blend-screen shadow-md rounded-md flex flex-col max-sm:w-11/12 max-md:w-3/5 max-lg:w-[48%] lg:w-[30%] flex items-center justify-center animate-fade-in duration-200 ease-linear'>
        <BeatLoader size={30} color='green' />
      </div>
    )
  }

  if (accepted) {
    return (
      <div className='p-3 sm:p-5 bg-green-400 shadow-md rounded-md flex flex-col max-sm:w-11/12 max-md:w-3/5 max-lg:w-[48%] lg:w-[30%] flex items-center justify-center animate-fade-in duration-200 ease-linear'>
        <IoMdCloudDone fontSize={30} color='white' />
        <p className='text-center'>Now you will take care</p>
        <h1 className='text-center'>{patientName}</h1>
      </div>
    )
  }

  if (internalServerError) {
    return (
      <div className='p-3 sm:p-5 bg-green-400 shadow-md rounded-md flex flex-col max-sm:w-11/12 max-md:w-3/5 max-lg:w-[48%] lg:w-[30%] flex items-center justify-center animate-fade-in duration-200 ease-linear'>
        <h1 className='text-center text-xl font-bold text-red-500'>Internal server error!</h1>
      </div>
    )

  }
  return (
    <div className='p-3 sm:p-5 bg-blend-screen shadow-md rounded-md flex flex-col max-sm:w-[100%] max-md:w-[48%] md:w-[32%]'>
      {caretaker && <><h1 className='text-3xl font-bold max-sm:text-2xl'>{patientName}</h1>
      <p className='text-xs text-gray-400'>POSTED AT - {postedAt.split('T')[0]} {postedAt.split('T')[1].split('.')[0]}</p>
      <hr className='h-[0.5px] border-b-[0.5px] border-gray-400 w-full my-2' /></>}
      <div>
        <h2 className='text-xl font-semibold md:text-2xl'>{medicineNames}</h2>
        <p className='text-xs text-gray-500'>{from} <span className='font-bold'>to</span> {to}</p>
        <div className='flex gap-2 flex-wrap'>
          {times?.map((time) => {
            const newTime = time.split('T')[1].split('.')[0];
            return (
              <span key={time} className='text-xs text-gray-500'>{newTime}, </span>
            );
          })}
        </div>

        {taken && caretaker && getDetails && (
          <div className='flex flex-col mt-3 animate-fade-in duration-200 ease-linear'>
            <h1 className='text-lg font-bold'>Patient details</h1>
            <div className='flex flex-col'>
              <p>Name: <span className='text-base font-bold'>{patientName}</span></p>
              <p>Email: <span className='text-base font-bold'>{email}</span></p>
              <p>Contact no: <span className='text-base font-bold'>{contactNo}</span></p>
              <p>WhatsApp no: <span className='text-base font-bold'>{whatsAppNo}</span></p>
            </div>
          </div>
        )}

        <div className='w-full'>
          {!taken ? (
            !confirmAccept ?
              <button
                type='button'
                className='cursor-pointer py-1 mt-5 px-3 bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 ease-linear rounded-md '
                onClick={() => setConfirmAccept(true)}
                disabled={confirmAccept}
              >
                Accept!
              </button>
              :
              <div className='flex gap-2'>
                <button
                  type='button'
                  className='cursor-pointer py-1 mt-5 px-3 bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-200 ease-linear rounded-md '
                  onClick={handleAccept}
                  disabled={accepting}
                >{accepting ? 'Accepting...' : 'Confirm!'}
                </button>
                <button
                  type='button'
                  className='cursor-pointer py-1 mt-5 px-3 text-red-600 hover:text-red-500 transition-all duration-200 ease-linear rounded-md '
                  onClick={() => setConfirmAccept(false)}
                  disabled={!confirmAccept}
                >
                  Cancel
                </button>
              </div>
          ) : (
            <div>
              {courseStatus === 'running' && caretaker && (
                <div className='flex gap-2'>
                  <button
                    type='button'
                    className='cursor-pointer py-1 mt-5 px-3 bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-200 ease-linear rounded-md '
                    onClick={() => handlePush(`Hey ${patientName}, it's your medication time.`)}
                    disabled={pushing === 'pushed' || pushing === 'pushing'}
                  >
                    {(pushing === 'pushed' || pushing === 'pushing') ? pushing.toLocaleUpperCase() : 'Push SMS!'}
                  </button>

                  <button
                    type='button'
                    className='cursor-pointer py-1 mt-5 px-3 bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-200 ease-linear rounded-md '
                    onClick={() => setGetDetails(!getDetails)}
                  >
                    {getDetails ? 'Show less' : 'Show more'}
                  </button>
                </div>
              )}
              {courseStatus === 'completed' && caretaker && (
                <div className='my-2'>
                  <h1 className='font-bold text-green-600 flex items-center'>Cogratulations! you have done a nice job and completed {patientName}'s course. <IoCheckmarkDoneCircleSharp fontSize={40} color='green' className='ml-2' /></h1>
                </div>
              )}
              {courseStatus === 'running' && careBy !== 'self' && !caretaker && (
                <div className='my-2'>
                  <h1 className='font-bold text-green-600'>Your course is running!</h1>

                  <h1 className='font-bold text-blue-600'>Your caretaker is {caretakerName}</h1>
                  {!confirmComplete ? (
                    <div className='flex flex-col gap-1'>
                      <button
                        type='button'
                        className='py-1 px-2 bg-blue-600 hover:bg-blue-500 rounded-md cursor-pointer text-white mt-2 transition-all duration-200 ease-linear'
                        onClick={()=>setConfirmComplete(true)}
                      >
                        Mark as completed
                      </button>
                      <button
                        type='button'
                        className='py-1 px-2 bg-red-600 hover:bg-red-500 rounded-md cursor-pointer text-white mt-2 transition-all duration-200 ease-linear'
                        onClick={()=>setConfirmComplete(true)}
                      >
                        Cancel medication
                      </button>
                    </div>
                  ) : (
                    <div className='flex gap-1'>
                    <button
                        type='button'
                        className='py-1 px-2 bg-blue-600 hover:bg-blue-500 rounded-md cursor-pointer text-white mt-2 transition-all duration-200 ease-linear'
                        onClick={handleCompleteCourse}
                      >
                        Confirm
                      </button>
                      <button
                        type='button'
                        className='py-1 px-2 bg-red-600 hover:bg-red-500 rounded-md cursor-pointer text-white mt-2 transition-all duration-200 ease-linear'
                        onClick={()=>setConfirmComplete(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                </div>
              )}
              {courseStatus === 'running' && careBy === 'self' && (
                <div className='my-2'>
                  <h1 className='font-bold text-green-600'>Your course is running!</h1>

                  <h1 className='font-bold text-blue-600'>We will notify you on time!</h1>
                </div>
              )}
              {courseStatus === 'completed' && !caretaker && (
                <div className='my-2'>
                  <h1 className='font-bold text-green-600 flex items-center'>Congratulations! your medication course is completed. <IoCheckmarkDoneCircleSharp fontSize={40} color='green' className='ml-2' /></h1>
                </div>
              )}
              {courseStatus !== 'completed' && courseStatus !== 'running' && !caretaker && (
                <div className='my-2'>
                  <h1 className='font-bold text-red-600'>Yet to accept!</h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}