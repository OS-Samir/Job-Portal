import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const {isAuthenticated} = useSelector(state => state.user);
  return (
    <>
    <nav className={show ? "navbar show_navbar": "navbar"}>
      <div className="logo">
        <img src="/logo.png" alt="logo" />
        <h4>Job Fear</h4>
        
      </div>
      <div className='links'>

        </div>
    </nav>
    </>
  )
}

export default Navbar
