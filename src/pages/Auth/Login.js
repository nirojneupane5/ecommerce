import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    const response = await fetch('http://localhost:4000/api/hawa/logIn', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.msg);
    } else {
      localStorage.setItem('token', json.accessToken);
      setEmail('');
      setPassword('');
      setAuthenticated(true);
      window.alert("Login successful");
      navigate('/');
    }
  };

  return (
    <>
   <div className="container">
    <div className='login-box'>
      <div className="d-flex justify-content-center">
        <h2>Login form</h2>
      </div>
      
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <label>Email</label><br />
          <input
            type="text" className='form-control'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
          /> <br />
          <label>Password</label> <br />
          <input
            type="password" className='form-control'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
          /> <br />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
      <div className='d-flex justify-content-center'>
        {error && <div className='text-danger '>{error}</div>}
      </div>
    </div>
  </div>
</>
  );
};

export default Login;
