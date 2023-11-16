import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestCard from '../caretaker/RequestCard';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';

import { FaUserCheck } from 'react-icons/fa';

const url = 'http://localhost:5000/api/caretaker-request-list';

export default function RequestList() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [requestList, setRequestList] = useState([]);
  const [searchEnd, setSearchEnd] = useState(false);
  
  const fetchMedicineRequests = (token) => {
    setLoading(true);
    const headers = {
      'Content-Type': 'application/json',
      'token': token
    }
    try {
      axios.get(url, { headers: headers })
        .then((response) => {
          if (response.data.success) {
            setUser(response.data.user);
            setRequestList(response.data.requestlist);
          } else {
            setServerError(true);
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Error while fetching medicine requests", error);
        })
        .finally(() => {
          setSearchEnd(true)
          setLoading(false);
        });
    } catch (error) {
      console.error("Error while fetching medicine requests", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("TakeYourMedicineAuth")) {
      fetchMedicineRequests(localStorage.getItem("TakeYourMedicineAuth"));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchEnd && user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-[60vh] w-full animate-fade-in transition-all duration-300 ease-linear'>
        <div className='flex flex-col items-center justify-center animate-fade-in duration-200 ease-in'>
          <BeatLoader size={30} color='blue' speedMultiplier={2} />
        </div>
      </div>
    )
  }

  if (serverError) {
    return (
      <div className='flex items-center justify-center h-[60vh] w-full animate-fade-in transition-all duration-300 ease-linear'>
        <div className='flex flex-col items-center justify-center animate-fade-in duration-200 ease-in'>
          <FaUserCheck fontSize={50} color='yellow' />
          <p className='text-black text-xl font-bold text-center'>User does not exist or internal Server Error!</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-wrap justify-evenly mx-auto max-sm:w-11/12 max-md:w-5/6 md:w-2/3 gap-2 md:gap-4'>
        {requestList.length !== 0 && requestList?.map(({ patient, caretaker, medicineNames, from, to, frequency, times, postedAt, contactNo, whatsAppNo, courseStatus, email, _id }) => (
          <RequestCard
            key={postedAt}
            patientName={patient.name}
            patientId={patient.userId}
            caretakerName={caretaker ? caretaker.name : ''}
            caretakerId={caretaker ? caretaker.userId : ''}
            contactNo={contactNo}
            whatsAppNo={whatsAppNo}
            email={email}
            courseStatus={courseStatus}
            medicineNames={medicineNames}
            from={from}
            to={to}
            frequency={frequency}
            times={times}
            postedAt={postedAt}
            requestId={_id}
            taken={false}
          />
        ))}
      </div>
    </div>
  )
}