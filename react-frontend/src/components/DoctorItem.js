import React from 'react';
import PropTypes from 'prop-types';

function DoctorItem(props) {
    
  //Destructuring
  const {id} = props.doctor;

  return (
      <div style={ doctorItem }>
          <p>
              { props.doctor.provider_full_name +  " - " + props.doctor.specialty }
              <button style={buttonStyle} onClick={ props.setAppointment.bind(this, id) }>Schedule Appointment</button>
          </p>
      </div>
      )
}

const doctorItem = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted'
}


//Styes
const buttonStyle = {
    background: '#FFF',
    color: '#000',
    border: '1px solid',
    padding: '5px 9px',
    borderRadius: '10',
    float: 'right'
}

//PropTypes
DoctorItem.propTypes = {
    doctor: PropTypes.object.isRequired
  }

export default DoctorItem;