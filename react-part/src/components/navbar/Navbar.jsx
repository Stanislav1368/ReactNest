import React from 'react' 
import './Navbar.scss'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  const navigate = useNavigate();

  
  return (
    <div className="rounded-4" style={{ backgroundColor: 'rgba(220,220,220,0.4)', height:'50px', width: '1823px',backdropFilter: 'blur(5px)'}}>
      nav zone
    </div>
  )
}

export default Navbar
