import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAllUserErrors, register } from '../../store/slices/userSlice';
import {FaAddressBook, FaPencilAlt, FaRegUser} from "react-icons/fa"
import {FaPhoneFlip} from "react-icons/fa6"
import {MdCategory, MdOutlineMailOutline} from "react-icons/md"
import {RiLock2Fill} from "react-icons/ri"
const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");


  const niches = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile App Developer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Embedded Systems Engineer",
    "Data Scientist",
    "Data Analyst",
    "Data Engineer",
    "Machine Learning Engineer",
    "Business Intelligence (BI) Analyst",
    "AI/Deep Learning Specialist",
    "Cybersecurity Analyst",
    "Penetration Tester",
    "Security Engineer",
    "Incident Response Analyst",
    "Network Security Administrator",
    "Ethical Hacker",
    "Database Administrator (DBA)",
    "Data Architect",
    "SQL Developer",
    "Big Data Engineer",
    "Cloud Solutions Architect",
    "Cloud Security Engineer",
    "Cloud DevOps Engineer",
    "Cloud Network Engineer",
    "Network Administrator",
    "Systems Administrator",
    "IT Support Specialist",
    "Network Engineer",
    "Infrastructure Engineer",
    "Telecommunications Engineer",
    "Web Developer",
    "UX/UI Designer",
    "Web Designer",
    "WordPress Developer",
    "IT Project Manager",
    "Technical Support Engineer",
    "IT Consultant",
    "IT Service Manager",
    "Product Manager",
    "AI Engineer",
    "Robotics Engineer",
    "Automation Engineer",
    "NLP Specialist",
    "Blockchain Developer",
    "Blockchain Architect",
    "Cryptography Engineer",
    "QA Engineer",
    "Software Tester",
    "Test Automation Engineer",
    "Technical Sales Engineer",
    "IT Marketing Specialist",
    "IT Business Analyst",
    "Game Developer",
    "Game Designer",
    "Game Programmer",
    "AR Developer",
    "VR Developer",
    "XR (Extended Reality) Engineer"
  ];
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    if (role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
    }
    dispatch(register(formData));
  };
  // console.log(formData);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated, message]);


  return (
  <>
  <section className='authPage'>
    <div className='container'>
        <div className="header">
          <h3>Create a new account</h3>
        </div>
        <form onSubmit={handleRegister}>
          <div className="wrapper">
            <div className="inputTag">
                  <label> Register as</label>
                  <div>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="">Select Role</option>
                      <option value="Employer">Register as an employer</option>
                      <option value="Job Seeker">Register as a job seeker</option>

                    </select>
                    <FaRegUser />
                  </div>
            </div>
            <div className="inputTag">
                  <label> Name </label>
                  <div>
                    <input type="text" placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)} />
                    <FaPencilAlt />
                  </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="inputTag">
                  <label> Email Address</label>
                  <div>
                  <input type="email" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <MdOutlineMailOutline />
                  </div>
            </div>
            <div className="inputTag">
                  <label> Phone Number </label>
                  <div>
                    <input type="number" placeholder='Your phone number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <FaPhoneFlip />
                  </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="inputTag">
                  <label> Address</label>
                  <div>
                  <input type="text" placeholder='Your Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                    <FaAddressBook />
                  </div>
            </div>
            <div className="inputTag">
                  <label> Password </label>
                  <div>
                    <input type="password" placeholder='Your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <RiLock2Fill />
                  </div>
            </div>
          </div>
           {
            role === "Job Seeker" && (
              <>
              <div className='wrapper'>
              <div className='inputTag'>
                <label>Your First Niche</label>
                <div>
                  <select value={firstNiche} onChange={(e) => setFirstNiche(e.target.value)}>
                    <option value="">Your First Niche</option>
                    {
                      
                      niches.map((niche, index) => {
                        return(
                          <option key={index} value={niche}>{niche}</option>
                        )

                      })
                    }
                  </select>
                  <MdCategory />
                </div>
              </div>
              <div className='inputTag'>
                <label>Your Second Niche</label>
                <div>
                  <select value={secondNiche} onChange={(e) => setSecondNiche(e.target.value)}>
                    <option value="">Your Second Niche</option>
                    {
                      niches.map((niche, index) => {
                        return (
                          <option key={index} value={niche}>{niche}</option>
                        )

                      })
                    }
                  </select>
                  <MdCategory />
                </div>
              </div>
              <div className='inputTag'>
                <label>Your Third Niche</label>
                <div>
                  <select value={thirdNiche} onChange={(e) => setThirdNiche(e.target.value)}>
                    <option value="">Your Third Niche</option>
                    {
                      niches.map((niche, index) => {
                        return (
                          <option key={index} value={niche}>{niche}</option>
                        )
                      })
                    }
                  </select>
                  <MdCategory />
                </div>
              </div>
              </div>
              <div className="wrapper">
                <div className="inputTag">
                  <label>Coverletter</label>
                  <div>
                    <textarea rows={10}  value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)}  ></textarea>
                  </div>
                </div>
              </div>
              <div className="wrapper">
                <div className="inputTag">
                  <label>Resume</label>
                  <div>
                    <input type="file"onChange={resumeHandler} style={{border: "none"}} />
                  </div>
                </div>
              </div>
              </>
            )
           }
           <button type='submit' disabled={loading}>Register</button>
           <Link to={"/login"}>Login Now</Link>
        </form>
    </div>

  </section>
  </>
  )
}

export default Register;
