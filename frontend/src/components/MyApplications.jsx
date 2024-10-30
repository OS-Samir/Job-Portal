import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import { clearAllApplicationErrors, resetApplicationSlice, deleteApplication, fetchJobSeekerApplications } from '../../store/slices/applicationSlice';


const MyApplications = () => {
  const {user, isAuthenticated} = useSelector((state) => state.user);
  const {loading, error, applications, message} = useSelector((state)=> state.application);
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
   
   </>
  )
}

export default MyApplications;
