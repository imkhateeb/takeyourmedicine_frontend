import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ScheduleMedicine from '../components/user/ScheduleMedicine';
import RequestList from '../components/user/RequestList';
import MyPatientList from '../components/caretaker/MyPatientList';
import MyMedicineSchedules from '../components/patient/MyMedicineSchedules';

export default function Main() {
   return (
      <Routes>
         <Route exact path='/*' element={<Home />} />
         <Route path='/login' element={<Login />} />
         <Route path='/signup' element={<Signup />} />
         <Route path='/medicine/add-schedule' element={<ScheduleMedicine />} />
         <Route path='/medicine/request-list' element={<RequestList />} />
         <Route path='/caretaker/my-patient-list' element={<MyPatientList />} />
         <Route path='/patient/my-medicine-schedules' element={<MyMedicineSchedules />}/>
      </Routes>
   )
}
