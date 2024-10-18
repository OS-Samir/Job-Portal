import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom";
import { clearAllUserErrors, login } from '../../store/slices/userSlice';
import {toast} from "react-toastify"
const Login = () => {
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {loading, isAuthenticated, error} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  }
  useEffect(()=> {
    if(error){
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if(isAuthenticated) {
      navigateTo("/");
    }
  }, [])
  return (
  <>
  </>
  )
}

export default Login
