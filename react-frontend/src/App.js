import React, { useState, useEffect } from 'react';
import Doctors from './components/Doctors';
import { useHistory } from "react-router-dom";

function App() {

  const [doctors, setDoctors] = useState(
    [
      {
        id: 1,
        provider_full_name: "Dr. Rodriguez",
        specialty: "Quirofano"
      },
      {
        id: 2,
        provider_full_name: "Dr. Santiago",
        specialty: "Pediatra"
      },
      {
        id: 3,
        provider_full_name: "Dr. Davila",
        specialty: "Cirugia"
      }
    ]
  )

  //Set Appointment
  const setAppointment = (id) => {
    
  }
  //const [placeholder, setPlaceholder] = useState('Hi');

  // useEffect(() => {
  //   fetch('/hello').then(res => res.json()).then(data => {
  //     setPlaceholder(data.result);
  //   });
  // }, []);

  //console.log(doctors);
  return (
    <div className="App">
      <Doctors doctors={doctors} setAppointment={setAppointment}/>
    </div>
  );
}

export default App;