import React, { useState, useEffect } from 'react';
import Doctors from './Doctors';
import history from '../history';

function Home(props) {

  const [doctors, setDoctors] = useState(
    [
    ]
  )

  const [filter, setFilter] = useState('');


  //Set Appointment
  const setAppointment = (id) => {
    setFilter('');
    const selectedDoctor = doctors.filter(doctor => doctor.id === id);
    props.history.push({
        pathname: '/appointment',
        state: selectedDoctor});
  }

  const addDoctor = () => {
    setFilter('');
    props.history.push('/adddoctor');
  }

  const filterDoctors = (e) => {
    setFilter(e.target.value);
  }
  
  //Call
  useEffect(() => {
    if(filter) { 
      const filteredDoctors = doctors.filter(doctor => doctor.provider_full_name.includes(filter) || doctor.specialty.includes(filter));
      setDoctors(filteredDoctors);
    }
    else {
      fetchData()
    }

  }, [filter]);
  //End Call

  const fetchData = async () => {
    fetch('/doctors').then(res => res.json()).then(data => {
      setDoctors(data);
    });
  };

  return (
      <div className="App">
        <label style={filterLabel}>
          Search: 
          <input type="text" value={filter} onChange={filterDoctors} style={filterInput}/>
        </label>
        <Doctors doctors={doctors} setAppointment={setAppointment}/>
        <button style={buttonStyle} onClick={ addDoctor }>Add Doctor</button>
      </div>
  );
}

const filterLabel = {
  margin: '5px'
}

const filterInput = {
  margin: '10px',
  width: '300px'
}

const buttonStyle = {
    background: '#FFF',
    color: '#000',
    border: '1px solid',
    padding: '5px 9px',
    borderRadius: '10',
    display: 'flex',
    justifyContent: "center",
    margin: '0 auto',
    marginTop: '20px'  
  }

export default Home;