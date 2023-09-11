import React, { useContext, useEffect, useState } from 'react';
import './Sidebar.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  useEffect(() => { 

    const token = localStorage.getItem('token');
    setToken(token);
    const headers = { 'Authorization': `Bearer ${token}` };

    axios.get('http://localhost:5000/users/me', { headers })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => console.error(error));
  }, []);

  return (
    <div className="col-md-2 rounded-4" style={{ backgroundColor: 'rgba(220,220,220,0.4)', height: '80vh', minWidth: '200px', maxWidth: '250px', backdropFilter: 'blur(5px)'}}>
      <ul className="list-unstyled d-flex flex-column" style={{height: '100%'}}>
        <li>
          <Link to='/' className='link'>
            <span>Home</span>
          </Link>
        </li>
        
        <li>
          <Link to={`/users/${user?.id}`} className='link'>
            <span>Profile</span>
          </Link>
        </li>
        
        <li>
          <Link to='/users' className='link'>
            <span>Users</span>
          </Link>
        </li>
        
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: 'rgba(220, 0, 0, 0.4)',
          }}
          onClick={() => {localStorage.removeItem('token'); navigate('/login');}}
          className="delete mt-auto border border-dark mb-2"
        >
          Log out
        </button>
     </ul>
    </div>
  );
};

export default Sidebar;