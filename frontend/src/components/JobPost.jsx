import React, { useEffect, useState } from 'react'
import { FaHandsAslInterpreting } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import { clearAllJobErrors, postJob, resetJobSlice } from '../../store/slices/jobSlice';
import {CiCircleInfo} from "react-icons/ci"


const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [offers, setOffers] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState();
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState();


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


  const cities = [
    "Kathmandu",
    "Pokhara",
    "Chitwan",
    "Itahari",
    "Lalitpur",
    "Janakpur",
    "Sindhuli",
    "Dharan",
    "Birgunj",
    "Dhangadhi",
    "Nepalgunj",
    "Bhaktapur",
    "Ghorahi",
    "Baglung",
    "Tansen",
    "Ilam",
    "Birendranagar",
    "Banepa",
    "Tikapur",
    "Inaruwa",
    "Bhadrapur",
    "Gaighat",
    "Gorkha"
  ];

  const {isAuthenticated, user} = useSelector((state) => state.user);
  const {loading, error, message} = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const handlePostJob = (e) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("introduction", introduction);
    formData.append("responsibilites", responsibilities);
    formData.append("qualifications",qualifications);
    offers && formData.append("offers", offers);
    formData.append("jobNiche",jobNiche);
    formData.append("salary", salary );
    hiringMultipleCandidates && formData.append("hiringMultipleCandidates",hiringMultipleCandidates);
    personalWebsiteTitle && formData.append("personalWebsiteTitle",personalWebsiteTitle);
    personalWebsiteUrl && formData.append("personalWebsiteUrl",personalWebsiteUrl);

  dispatch(postJob(formData))

  };

  useEffect(()=> {
    if(error){
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetJobSlice());
    }
  }, [dispatch, error, message, loading])



  return (
    <div className='account_components'>
      <h3>Post a job</h3>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Job Title' />
      </div>

      <div>
        <label>Job Type</label>
        <select  value={jobType} onChange={(e)=> setJobType(e.target.value)}>
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>

        </select>
      </div>

      <div>
        <label>Location(city)</label>
        <select  value={location} onChange={(e)=> setLocation(e.target.value)}>
        <option value="">Select Job Type</option>

          {

            cities.map((element)=> {
              return (
                  <option value={element}>{element}</option>
              )
            })


          }

        </select>
      </div>

      <div>
        <label>Company Name</label>
        <input type="text" value={companyName} onChange={(e)=>setCompanyName(e.target.value)} placeholder='Job Title' />
      </div>

      <div>
        <label>Company/Job Introduction</label>
          <textarea value={introduction} onChange={(e)=>setIntroduction(e.target.value)} placeholder='Company / Job Introduction' rows={10}/>
      </div>

      <div>
        <label>Responsibilites</label>
        <textarea value={responsibilities} onChange={(e)=>setResponsibilities(e.target.value)} placeholder='Job Responsibilites' rows={10}/>

      </div>

      <div>
        <label>Qualifications</label>
        <textarea value={qualifications} onChange={(e)=>setQualifications(e.target.value)} placeholder='Required Qualifications for job' rows={10}/>
      </div>

      <div>

        <div className='label-infoTag-wrapper'> 
        <label>What we Offer</label>
          <span>
          <CiCircleInfo /> Optional  
        </span>
        </div>
       
        <textarea value={offers} onChange={(e)=>setOffers(e.target.value)} placeholder='What are we offering!' rows={10}/>

      </div>

      <div>
        <label>Job Niche</label>
        <select  value={jobNiche} onChange={(e)=> setJobNiche(e.target.value)}>
        <option value="">Select Job Niche</option>

          {

            niches.map((element)=> {
              return (
                  <option value={element}>{element}</option>
              )
            })


          }

        </select>
      </div>

      
      <div>
        <label>Salary</label>
        <input type="text" value={salary} onChange={(e)=>setSalary(e.target.value)} placeholder='40000 - 100000' />
      </div>


      <div>
        
        <div className='label-infoTag-wrapper'>
        <label>Hiring Mutiple Candidates</label>
        <span>
          <CiCircleInfo /> Optional  
        </span>
        </div>
       
        <select  value={hiringMultipleCandidates} onChange={(e)=> setHiringMultipleCandidates(e.target.value)}>
          <option value="">Hiring Multiple Candidates</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>

        </select>

      </div>


      <div>
        
        <div className='label-infoTag-wrapper'>
        <label>Personal Website Name </label>
        <span>
          <CiCircleInfo /> Optional  
        </span>
        </div>
       
          <input type="text"  value={personalWebsiteTitle} onChange={(e) => setPersonalWebsiteTitle(e.target.value)} placeholder='Personal Website Name/Title'/>

      </div>

      <div>
        
        <div className='label-infoTag-wrapper'>
        <label>Personal Website URL Link </label>
        <span>
          <CiCircleInfo /> Optional  
        </span>
        </div>
       
          <input type="text"  value={personalWebsiteUrl} onChange={(e) => setPersonalWebsiteUrl(e.target.value)} placeholder='Personal Website URL Link'/>

      </div>
          <div>
            <button style={{margin: "0 auto"}} className='btn' onClick={handlePostJob} disabled={loading}>
              Post Job
            </button>
          </div>

    </div>
  )
}

export default JobPost;
