import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner"
import {FaSearch} from "react-icons/fa"
import {clearAllJobErrors, fetchJobs} from ""
const Jobs = () => {
  const[city, setCity] = useState("");
  const[selectCity, setSelectedCity] = useState("");
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

            </div>
        </section>
      )
    }
    </>
  )
}

export default Jobs
