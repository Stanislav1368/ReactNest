  import React, { useState } from 'react';
  import axios from 'axios';
  import { Navigate, useNavigate } from 'react-router-dom';
  import './Login.scss';

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
      e.preventDefault(); 
      try {
        const response = await axios.post('http://localhost:5000/auth/login', { email, password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/');
        console.log(token);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    return (
      <div className="login container d-flex justify-content-center align-items-center" >
        <div className="card" >
          <div className="card-body" >
            <h3 className="card-title text-center">Авторизация</h3>
              <form onSubmit={handleLogin}>
                <input type='email' placeholder='email' onChange={e => setEmail(e.target.value)}></input>
                <input type='password' placeholder='password' onChange={e => setPassword(e.target.value)}></input>
                <button type='submit'>Login</button>
                {error ? <span>Неверная почта или пароль</span> : <span></span>}
              </form>
              <a className='d-flex justify-content-center mt-5' href="/registration">Register</a>
          </div>
        </div>
      </div>
      
    );
  };

  export default Login
