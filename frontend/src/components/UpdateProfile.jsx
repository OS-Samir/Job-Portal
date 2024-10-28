
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { clearAllUpdateProfileErrors, updateProfile } from '../../store/slices/updateProfileSlice';
import { isAction } from '@reduxjs/toolkit';

const UpdateProfile = () => {
    const { user } = useSelector((state)=> state.user);
    const { loading, error, isUpdated } = useSelector((state)=> state.updateProfile);

    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThordNiche] = useState("");
  const [resume, setResume] = useState("");
  const [resumePreview, setResumePreview] = useState("");

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



  return (
    <div className='account_components'>
        <h3>My Profile</h3>
        <div>
            <label>Full Name</label>
            <input type="text" disabled value={user && user.name} onChange={(e) => e.target.value} />
        </div>
        <div>
            <label>Email Address</label>
            <input type="email" disabled value={user && user.email} onChange={(e) => e.target.value} />
        </div>
        {
            user && user.role == "Job Seeker" && (
            <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
            <label>My Preferred Job Niches</label>
            <div>
            <input type="text" disabled value={user && user.niches.firstNiche} onChange={(e) => e.target.value} />
            <input type="text" disabled value={user && user.niches.secondNiche} onChange={(e) => e.target.value} />            
            <input type="text" disabled value={user && user.niches.thirdNiche} onChange={(e) => e.target.value} />
            </div> 
            </div>
            )
        }
        <div>
            <label>Phone Number</label>
            <input type="number" disabled value={user && user.phone} onChange={(e) => e.target.value} />
        </div>
        <div>
            <label>Address</label>
            <input type="text" disabled value={user && user.address} onChange={(e) => e.target.value} />
        </div>
        <div>
            <label>Role</label>
            <input type="text" disabled value={user && user.role} onChange={(e) => e.target.value} />
        </div>
        <div>
            <label>Joined On</label>
            <input type="text" disabled value={user && user.createdAt.substring(0, 10)} onChange={(e) => e.target.value} />
        </div>
    </div>
  )
}

export default UpdateProfile;
