import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner"
import {FaSearch} from "react-icons/fa"
import { clearAllJobErrors, fetchJobs } from "../../store/slices/jobSlice";
const Jobs = () => {
  const[city, setCity] = useState("");
  const[selectedCity, setSelectedCity] = useState("");
  const[niche, setNiche] = useState("");
  const[selectedNiche, setSelectedNiche] = useState("");
  const[searchKeyWord, setSearchKeyWord] = useState("");
  
  const {jobs, loading, error} = useSelector(state => state.jobs);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };
  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const dispatch = useDispatch();

  useEffect (()=> {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors())
    }
    dispatch (fetchJobs(city, niche, searchKeyWord));
  }, [dispatch, error, city, niche]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyWord));
  }

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
  ]

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
  ]
  return (
    <>
    {
      loading ? <Spinner /> : (
        <section className="jobs">
            <div className="search-tab-wrapper">
              <input type="text" value={searchKeyWord} onChange={(e) => setSearchKeyWord(e.target.value) } />
              <button onClick={handleSearch}>Find job</button>
              <FaSearch />
            </div>
            <div className="wrapper">
                <div className="filter-bar">
                  <div className="cities">
                    <h2>Filter job by city</h2>
                    {
                      cities.map((city, index)=> (
                        <div key={index}>
                          <input type="radio" id={city} name="city" value={city} checked={selectedCity == city} onChange={() => handleCityChange(city)} />
                        <label htmlFor={city}>{city}</label>
                        </div>
                      ))
                    }
                  </div>
                  <div className="cities">
                    <h2>Filter job by niche</h2>
                    {
                      niches.map((niche, index)=> (
                        <div key={index}>
                          <input type="radio" id={niche} name="niche" value={niche} checked={selectedNiche == niche} onChange={() => handleNicheChange(niche)} />
                        <label htmlFor={niche}>{niche}</label>
                        </div>
                      ))
                     }
                  </div>
                </div>
                <div className="container">
                  <div className="mobile-filter">
                    <select value={city} onChange={(e) => setCity(e.target.value)}>
                      <option value="">filter by city</option>
                      {cities.map((city, index) => (
                        <option value={city} key={index}> {city} </option>
                      ))}
                    </select>
                    <select value={niche} onChange={(e) => setNiche(e.target.value)}>
                      <option value="">filter by niche</option>
                      {cities.map((niche, index) => (
                        <option value={niche} key={index}> {niche} 
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
            </div>
        </section>
      )
    }
    </>
  )
}

export default Jobs
