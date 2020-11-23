import React, { useState, useEffect } from 'react';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import moment from "moment";

function Appointment(props) {

    //State
    const [data, setData] = useState({
        patientName: '',
        reason: '',
        gender: 'male',
        prefferedDate: new Date(),
        endDate: new Date(),
        dateOfBirth: '',
        phoneNumber: '',
        providerId: props.location.state
    })

    const [providerName, setProviderName] = useState('');

    //Used to set the dates that should be disabled for the the user to set an appointment (cannot go to the past)
    var yesterday = moment().subtract(1, "day");
    function valid(current) {
        return current.isAfter(yesterday);
    }

    //"Lifecycle"
    useEffect(() => {
        const selectedDoctor = props.location.state;
        setProviderName(selectedDoctor[0].provider_full_name);
        setData({
            ...data,
            providerId: selectedDoctor[0].id
        })

    }, [props.location.state]);

    //Functions  
    const onChangeName = (e) => {
        setData({
            ...data,
            patientName: e.target.value
        })
    };

    const onChangeReason = (e) => {
        setData({
            ...data,
            reason: e.target.value
        })
    }

    const onChangeGender = (e) => {
        setData({
            ...data,
            gender: e.target.value
        });
    }

    const onChangePrefferedDate = (date) => {
        setData({
            ...data,
            prefferedDate: date,
            endDate: date
        })
    }

    const onChangeDateOfBirth = (date) => {
        setData({
            ...data,
            dateOfBirth: date.toDate()
        })
    }

    const onChangePhoneNumber = (e) => {
        setData({
            ...data,
            phoneNumber: e.target.value.replace(/\D/, '')
        });
    }

    //Sends a request to the backend to add an appointment to the database (if all fields are filled)
    const handleSubmit = (e) => {

        if (!data.reason || !data.prefferedDate || !data.patientName || !data.gender || !data.dateOfBirth || !data.phoneNumber) {
            alert("Please fill all the fields");
        }
        else {
            fetch('/appointment', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((result) => result.json())
                .then((info) => { console.log("Info: " + info); })
            setData({
                patientName: '',
                reason: '',
                gender: '',
                prefferedDate: new Date(),
                endDate: new Date(),
                dateOfBirth: '',
                phoneNumber: '',
                providerId: ''
            });
            setProviderName('');
            props.history.push('/');
        }
    }

    //Render
    return (
        <div>
            <h1>Schedule an appointment with: {providerName}</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={label}>
                    Date:
            <Datetime inputProps={{ readOnly: true }} value={data.prefferedDate} onChange={onChangePrefferedDate} style={{ padding: '5px' }} isValidDate={valid} />
                </label>
                <label style={label}>
                    Reason:
            <div>
                        <input type="text" value={data.reason} onChange={onChangeReason} style={{ padding: '5px', width: '400px' }} />
                    </div>
                </label>
                <label style={label}>
                    Patient Name:
            <div>
                        <input type="text" value={data.firstName} onChange={onChangeName} style={{ padding: '5px' }} />
                    </div>
                </label>
                <label style={label}>
                    Gender:
            <div>
                        <select value={data.gender} onChange={onChangeGender} style={{ padding: '5px' }}>
                            <option value="male">M</option>
                            <option value="female">F</option>
                        </select>
                    </div>
                </label>
                <label style={label}>
                    Date of Birth:
            <Datetime inputProps={{ readOnly: true }} value={data.dateOfBirth} timeFormat={false} onChange={onChangeDateOfBirth} style={{ padding: '5px' }} />
                </label>
                <label style={label}>
                    Phone Number:
            <div>
                        <input type="text" value={data.phoneNumber} onChange={onChangePhoneNumber} style={{ padding: '5px' }} maxLength="10" />
                    </div>
                </label>
                <input type="submit" value="Submit" className="btn" style={buttonStyle} />
            </form>
        </div>
    );
}

//Styles
const label = {
    margin: '5px'
}

const buttonStyle = {
    background: '#FFF',
    color: '#000',
    border: '1px solid',
    padding: '5px 9px',
    borderRadius: '10',
    margin: 'auto',
    float: 'left',
    marginTop: '20px'
}

export default Appointment;