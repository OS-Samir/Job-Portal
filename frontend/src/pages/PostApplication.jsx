import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import {useNavigate, useParams} from "react-router-dom"
import { postApplication, clearAllApplicationErrors, resetApplicationSlice } from '../../store/slices/applicationSlice';
import { fetchSingleJob } from '../../store/slices/jobSlice';
import {toast} from "react-toastify"
const PostApplication = () => {
  const {singleJob} = useSelector((state) => state.jobs)
  const {isAutheticated, user} = useSelector((state) => state.user);
  const {loading, error, message} = useSelector((state) => state.applications);
  
  const {jobId} = useParams();

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [address, setAddress] = useState(user && user.address);
  const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
  const [resume, setResume] = useState(user && user.resume && user.resume.url);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if(resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));

  };
  useEffect(() => {
if(error) {
  toast.error(error);
  dispatch(clearAllApplicationErrors());
}
if (message) {
  toast.success(message);
  dispatch(resetApplicationSlice());
}
if((user && user.role === "Employer") || !isAutheticated) {
  navigateTo("/");
}
dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId]);

  let qualifications = [];
  let responsibilites = [];
  let offering = [];

  if(singleJob.qualifications) {
    qualifications = singleJob.qualifications.split(". ")
  }
  if(singleJob.responsibilites) {
    responsibilites = singleJob.responsibilites.split(". ")
  }
  if(singleJob.offers) {
    offering = singleJob.offers.split(". ")
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  }


  return (
    <>
  <article className='application_page'>
    <form>
      <h3>Application Form</h3>

      <div>
        <label>Job Title</label>
        <input type="text" placeholder={singleJob.title} disabled/>
      </div>

      <div>
        <label>Your Name</label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
      </div>

      <div>
        <label>Your Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      </div>

      <div>
        <label>Phone Number</label>
        <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} />
      </div>

      <div>
        <label>Address</label>
        <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} />
      </div>   

      <div>
        <label>Cover Letter</label>
        <textarea value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)} rows={10} />
      </div>    

      <div>
        <label>Resume</label>
        <input type="file" onChange={resumeHandler} />
      </div>    
      
      <div style={{alignItems: "flex-end"}}>
        <button className='btn' onClick={handlePostApplication} disabled={loading} >
          Apply
        </button>
      </div>

    </form>
  </article>
    </>
  )
}

export default PostApplication
