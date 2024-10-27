import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout, clearAllUserErrors } from '../../store/slices/userSlice'; 
const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("");

  const {loading, isAuthenticated, error, user} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully")
  };

  useEffect(()=> {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
        navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated])


  return (
   <>
  <section className='account'>

    <div className="component_header">
      <p>Dashboard</p>
      <p>Welcome <span>{user && user.name}</span></p>
    </div>


  </section>










   </>
  )
}

export default Dashboard;
