import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom";
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
  }
  return (
  <>
  </>
  )
}

export default Login
