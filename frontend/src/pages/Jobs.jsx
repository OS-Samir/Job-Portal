import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from 'react-toastify';
import Spinner from "../components/Spinner";
import {FaSearch} from "react-icons/fa";
import { clearAllJobErrors, fetchJobs } from "../../store/slices/jobSlice";
import {Link} from "react-router-dom";
const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };
  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, error, city, niche]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

  const cities = [
    "Kathmandu",
    "Pokhara",
    "Lalitpur",
    "Bhaktapur",
    "Biratnagar",
    "Birgunj",
    "Dharan",
    "Butwal",
    "Bharatpur",
    "Hetauda",
    "Nepalgunj",
    "Itahari",
    "Janakpur",
    "Dhangadhi",
    "Tulsipur",
    "Ghorahi",
    "Damak",
    "Bhadrapur",
    "Rajbiraj",
    "Lahan",
    "Gorkha",
    "Siddharthanagar",
    "Panauti",
    "Baglung",
    "Dhankuta",
    "Surkhet",
    "Palpa",
    "Tikapur",
    "Kirtipur",
    "Tansen",
    "Putalibazar"
  ];

  const niches = [
    "Software Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile App Developer",
    "Game Developer",
    "DevOps Engineer",
    "Data Scientist",
    "Data Analyst",
    "Machine Learning Engineer",
    "Business Intelligence Analyst",
    "Data Engineer",
    "Security Analyst",
    "Penetration Tester (Ethical Hacker)",
    "Security Engineer",
    "Chief Information Security Officer (CISO)",
    "Incident Responder",
    "Cloud Architect",
    "Cloud Engineer",
    "Cloud Security Specialist",
    "Cloud Solutions Architect",
    "Database Administrator (DBA)",
    "Data Architect",
    "SQL Developer",
    "Big Data Engineer",
    "Network Administrator",
    "Network Engineer",
    "Systems Administrator",
    "Systems Engineer",
    "IT Support Specialist",
    "IT Project Manager",
    "Scrum Master",
    "Product Manager",
    "Agile Coach",
    "AI Developer",
    "AI Research Scientist",
    "Robotics Engineer",
    "Natural Language Processing (NLP) Specialist",
    "QA Engineer",
    "Automation Tester",
    "Manual Tester",
    "Performance Tester",
    "UI Designer",
    "UX Designer",
    "UX Researcher",
    "Interaction Designer",
    "IT Consultant",
    "Systems Analyst",
    "Technology Consultant",
    "Technical Writer",
    "Documentation Specialist",
    "Instructional Designer",
    "AR/VR Developer",
    "3D Artist",
    "AR/VR UX Designer"
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Find Job</button>
            <FaSearch />
          </div>
          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Job By City</h2>
                {cities.map((city, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={city}
                      name="city"
                      value={city}
                      checked={selectedCity === city}
                      onChange={() => handleCityChange(city)}
                    />
                    <label htmlFor={city}>{city}</label>
                  </div>
                ))}
              </div>
              <div className="cities">
                <h2>Filter Job By Niche</h2>
                {niches.map((niche, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={niche}
                      name="niche"
                      value={niche}
                      checked={selectedNiche === niche}
                      onChange={() => handleNicheChange(niche)}
                    />
                    <label htmlFor={niche}>{niche}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="container">
              <div className="mobile-filter">
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Filter By City</option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>
                      {city}
                    </option>
                  ))}
                </select>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                >
                  <option value="">Filter By Niche</option>
                  {niches.map((niche, index) => (
                    <option value={niche} key={index}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>
              <div className="jobs_container">
                {jobs &&
                  jobs.map((element) => {
                    return (
                      <div className="card" key={element._id}>
                        {element.hiringMultipleCandidates === "Yes" ? (
                          <p className="hiring-multiple">
                            Hiring Multiple Candidates
                          </p>
                        ) : (
                          <p className="hiring">Hiring</p>
                        )}
                        <p className="title">{element.title}</p>
                        <p className="company">{element.companyName}</p>
                        <p className="location">{element.location}</p>
                        <p className="salary">
                          <span>Salary:</span> Rs. {element.salary}
                        </p>
                        <p className="posted">
                          <span>Posted On:</span>{" "}
                          {element.jobPostedOn.substring(0, 10)}
                        </p>
                        <div className="btn-wrapper">
                          <Link
                            className="btn"
                            to={`/post/application/${element._id}`}
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};


export default Jobs
