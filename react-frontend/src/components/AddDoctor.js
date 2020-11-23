import React, { useState } from 'react';

function AddDoctor(props) {

  //State
  const [data, setData] = useState({
      name: '',
      specialty: ''
  })

  //Sets the name to the user input of the name field
  const onChangeName = (e) => {
    setData({
        ...data,
        name: e.target.value
    })
  }

  //Sets the specialty to the user input of the specialty field
  const onChangeSpecialty = (e) => {
      setData({
        ...data,
        specialty: e.target.value
    })
  }

  //Make a call to the backend to add a new doctor and clear the data that the user entered
  const onSubmit = async (e) => {
      if( !data.name || !data.specialty) {
        alert("Please fill all the fields")
      }
      else{
        fetch('/register' , {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then((result) => result.json())
        .then((info) => { console.log("Info: " + info); })
        setData({
            name: '',
            specialty: ''
        });
        props.history.replace('/');
      }
  }

  return (
    <form  onSubmit={ onSubmit } style={{ display: 'flex', flexDirection: 'column'}}>
        <label style={label}>
            Name:
            <div>
              <input type="text" value={data.name} onChange={ onChangeName } style={input}/>
            </div>
        </label>
        <label style={label}>
            Specialty:
            <div>
              <input type="text" value={data.specialty} onChange={ onChangeSpecialty } style={input}/>
            </div>
        </label>
        <input type="submit" value="Submit" className="btn" style={buttonStyle}/>
    </form>
  );
}


//Styles
const input = {
  padding: '5px',
}

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

export default AddDoctor;