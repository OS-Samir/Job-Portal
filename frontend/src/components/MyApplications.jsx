import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import { clearAllApplicationErrors, resetApplicationSlice, deleteApplication, fetchJobSeekerApplications } from '../../store/slices/applicationSlice';
import Spinner from "../components/Spinner";
import { Link } from 'react-router-dom';


const MyApplications = () => {
  const {user, isAuthenticated} = useSelector((state) => state.user);
  const {loading, error, applications, message} = useSelector((state)=> state.applications);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(()=> {
    if(error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }{
      if (message) {
        toast.success(message);
        dispatch(resetApplicationSlice());
      }
     
    }
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
    dispatch(fetchJobSeekerApplications());
  }

  return (
   <>
   {
    loading ? (<Spinner />) : (
      applications && applications.length <= 0 ? (
        <h1 style={{fontSize:"1.4 rem", fontWeight: "600"}}>You have not applied for any job</h1>
      ): (
        <>
          <div className='account_component'>
            <h3>My Application for jobs</h3>
          </div>
        </>
      )
    )
   }
   </>
  )
}

export default MyApplications;
