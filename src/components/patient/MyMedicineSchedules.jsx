import React, { useEffect, useState } from 'react';

import { FaSearchengin } from "react-icons/fa6";

import { useNavigate } from 'react-router-dom';
import RequestCard from '../caretaker/RequestCard';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';

import FilterSchedules from '../common/FilterSchedules';

const url = 'http://localhost:5000/api/my-schedule-list';


export default function MyMedicineSchedules() {
  const [mySchedules, setMySchedules] = useState([]);
  const [originalScheduleList, setOriginalScheduleList] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [searchEnd, setSearchEnd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchScheduleList = (token) => {
    const headers = {
      'Content-Type': 'application/json',
      'token': token
    }
    setLoading(true);
    try {
      axios.get(url, { headers })
        .then((response) => {
          if (response.data.success) {
            setUser(response.data.user)
            setMySchedules(response.data.patientList);
            setOriginalScheduleList(response.data.patientList)
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
          setSearchEnd(true);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error while fetching medicine requests", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("TakeYourMedicineAuth")) {
      fetchScheduleList(localStorage.getItem("TakeYourMedicineAuth"));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchEnd && user === null) {
      navigate("/login");
    }
  }, [user]);

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
    <div className='flex flex-col mx-auto max-md:w-11/12 w-[80%]'>
      <FilterSchedules
        originalScheduleList={originalScheduleList}
        setMySchedules={setMySchedules}
        handleSearchTerm={setSearchTerm}
      />
      <div className='flex flex-wrap justify-evenly mx-auto w-full gap-2'>
        {mySchedules.length > 0 && mySchedules?.map(({ patient, caretaker, medicineNames, from, to, freqenucy, times, postedAt, contactNo, whatsAppNo, courseStatus, email, _id, careBy }) => (
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
            frequency={freqenucy}
            times={times}
            postedAt={postedAt}
            requestId={_id}
            taken={true}
            caretaker={false}
            careBy={careBy}
            searchTerm={searchTerm}
          />
        ))}
      </div>
    </div>
  )
}