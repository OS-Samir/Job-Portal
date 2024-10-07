import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner"
import {FaSearch} from "react-icons/fa"
import { clearAllJobErrors, fetchJobs } from "../../store/slices/jobSlice"
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
                      cities.map((city, index)=> {
                        <div key={index}>
                          <input type="radio" id={city} name="city" value={city} checked={selectedCity == city} onChange={() => handleCityChange(city)} />

                        </div>
                      })
                    }
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
