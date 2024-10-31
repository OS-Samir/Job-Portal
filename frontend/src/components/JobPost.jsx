import React, { useState } from 'react'

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

  return (
    <div>
      
    </div>
  )
}

export default JobPost
