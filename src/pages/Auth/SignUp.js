import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const navigate = useNavigate();
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { fname, lname, email, password, address, contact, gender };
   
    const url="http://localhost:4000/api/hawa//signUp"
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (!response.ok) {
      const { errors } = json;
      console.log(errors);
      setError(errors.join(', '));
    } else {
     
      navigate(`/login`);
      setFName('');
      setEmail('');
      setPassword('');
      setLName('');
      setAddress('');
      setContact('');
      setGender('');
      window.alert("SignUp succesful");
      
    }
  };

  return (
    <>
      <div className="container">
   

        <div className="d-flex justify-content-center">
        <h2 >SignUp</h2>
        </div>
        <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
             <label>First Name</label><br />
            <input className='form-control'type="text" onChange={(e) => setFName(e.target.value)} value={fname} required /> <br />
            <label>Last Name</label> <br />
            <input className='form-control' type="text" onChange={(e) => setLName(e.target.value)}   value={lname}   required /> <br />
             <label>Email</label><br />
            <input
              type="text" className='form-control'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            /> <br />
           
           <label>Password</label><br />
        
            <input
              type="password" className='form-control'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            /> <br />
            
            <label>Address</label><br />
        
            <input
              type="text" className='form-control'
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
            /> <br />
            <label>Contact</label><br />
          
            <input
              type="text" className='form-control'
              onChange={(e) => setContact(e.target.value)}
              value={contact}
              required
            /> <br />
            
         
          <div className='d-flex'>
            <label className='mx-2 my-2'>Gender</label>
            <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'}
              onChange={() => setGender('male')} /> <p className='my-2 mx-2'> Male</p>
            <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'}
              onChange={() => setGender('female')} /> <p className='my-2 mx-2'> Female</p>
            <input type="radio" id="others" name="gender" value="others" checked={gender === 'others'}
              onChange={() => setGender('others')} /> <p className='my-2 mx-2'> Others</p>
          </div>
          <button className="btn btn-success" style={{width:'150px', height:'40px'}}>SignUp</button>
        </form>
        </div>
        <div className='d-flex justify-content-center'>
        {error && <div className='text-danger '>{error}</div>}
      </div>
      </div>
    </>
  );
};

export default SignUp;
