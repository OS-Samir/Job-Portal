import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom";
import { clearAllUserErrors, login } from '../../store/slices/userSlice';
import {toast} from "react-toastify"
import { FaAddressBook, FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
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
  }, [dispatch, error, loading])
  return (
  <>
  <section className='authPage'>
      <div className="container login-container">
          <div className="header">
            <h3>login to your account</h3>
          </div>
          <form onSubmit={handleLogin}>
          <div className="inputTag">
                  <label> Login as</label>
                  <div>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="">Select Role</option>
                      <option value="Employer">Login as an employer</option>
                      <option value="Job Seeker">Loginas a job seeker</option>

                    </select>
                   <FaRegUser />
                  </div>
            </div>
            <div className="inputTag">
                  <label> Email </label>
                  <div>
                    <input type="email" placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <MdOutlineMailOutline />
                  </div>
            </div>
            <div className="inputTag">
                  <label> Password </label>
                  <div>
                    <input type="password" placeholder='Your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <RiLock2Fill />
                  </div>
            </div>
            <button type='submit' disabled={loading}>Login</button>
            <Link to={"/login"}>Register now</Link>
          </form>
      </div>
  </section>
  </>
  )
}

export default Login
