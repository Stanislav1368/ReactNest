import React, { useState } from 'react';
import axios from 'axios';
import './Registration.scss';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:5000/auth/registration', {
          email,
          password,
        });
        console.log(response.data);
        navigate('/login');
      } catch (error) {
        setError(true);
      }
    };
  
    return (
      <div className="registration container d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center">Регистрация</h3>
            <form onSubmit={handleSubmit}>
              <input type='email' placeholder='email' onChange={e => setEmail(e.target.value)}></input>
              <input type='password' placeholder='password' onChange={e => setPassword(e.target.value)}></input>
              <button type='submit'>Registration</button>
              {error ? <span>Заполните все поля</span> : <span></span>}
            </form>
            <a className='d-flex justify-content-center mt-5' href="/login">login</a>
        </div>
      </div>
    </div>
    );
}

export default Registration
