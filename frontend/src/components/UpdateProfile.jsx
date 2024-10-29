
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { clearAllUpdateProfileErrors, updateProfile } from '../../store/slices/updateProfileSlice';
import { isAction } from '@reduxjs/toolkit';
import { LuRows } from 'react-icons/lu';
import { toast } from 'react-toastify';
import {getUser} from "../../store/slices/userSlice"

const UpdateProfile = () => {
    const { user } = useSelector((state)=> state.user);
    const { loading, error, isUpdated } = useSelector((state)=> state.updateProfile);

    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [address, setAddress] = useState(user && user.address);
  const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
  const [firstNiche, setFirstNiche] = useState(user && user.niches?.firstNiche);
  const [secondNiche, setSecondNiche] = useState(user && user.niches?.secondNiche);
  const [thirdNiche, setThirdNiche] = useState(user && user.niches?.thirdNiche);
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user && user.resume?.url);

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if(user && user.role === "Job Seeker"){
        formData.append("firstNiche", firstNiche);
        formData.append("secondNiche", secondNiche);
        formData.append("secondNiche", secondNiche);
        formData.append("secondNiche", secondNiche);

    }

    if (resume) {
        formData.append("resume", resume);
    }
    dispatch(updateProfile(formData));

  };
 
  useEffect(() => {

    if(error) {
        toast.error(error);
        dispatch(clearAllUpdateProfileErrors())
    }
    if (isUpdated){
        toast.success("Profile updated successfully")
        dispatch(getUser());
        dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated, user])

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setResumePreview(reader.result);
        setResume(file);
    };
  };


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
  return (
    <div className='account_components'>
        <h3>Update Profile</h3>
        <div>
            <label>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
            <label>Phone Number</label>
            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
            <label>Address</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        
    {
   user && user.role == "Job Seeker" && (

    <>
    <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
    <label>My Preferred Job Niches</label>
    <div>
        <select value={firstNiche} onChange={(e) => setFirstNiche(e.target.value)}>

        { niches.map((element, index) => {
                return (

                    <option value={element} key={index}>{element}</option>

                )

            })
        }
    </select>

<select value={secondNiche} onChange={(e) => setSecondNiche(e.target.value)}>

{ niches.map((element, index) => {
        return (

            <option value={element} key={index}>{element}</option>

        )

    })
}
</select>

<select value={thirdNiche} onChange={(e) => setThirdNiche(e.target.value)}>

{ niches.map((element, index) => {
        return (

            <option value={element} key={index}>{element}</option>
        )

    })
}
</select>

</div> 
</div>
<div>
    <label>Cover Letter</label>
    <textarea  value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows={5} />
</div>
<label>Update Resume</label>
<input type="file" onChange={resumeHandler} />
{
    user && user.resume && (
        <div>
            <p>Current Resume:</p>
            <Link to={user.resume && user.resume.url} target='_blank' className='view-resume'>View Resume</Link>
        </div>
    )
}

</>
 )}
 <div className='save_change_btn_wrapper'>
        <button className='btn' onClick={handleUpdateProfile} disabled={loading}>  
        {""}
        Save Changes
        </button>
 </div>

</div>
  )
}

export default UpdateProfile;
