import React from 'react';
import DoctorItem from './DoctorItem';
import PropTypes from 'prop-types';

function Doctors(props) {

  return props.doctors.map((doctor) => (
        <DoctorItem key={doctor.id} doctor={doctor} setAppointment={ props.setAppointment }/>
      ));
}


//PropTypes
Doctors.propTypes = {
  doctors: PropTypes.array.isRequired
}

export default Doctors;