
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  FaSquareInstagram, FaLinkedin, FaGithub} from "react-icons/fa6"
const Footer = () => {
  const {isAuthenticated} = useSelector((state) => state.user);
  return (
    <>
    <footer>
      <div>
        <img src="/logo.png" style={{borderRadius: "50%", width: "120px"}} draggable="false" alt="A logo" />
      </div>
      <div>
        <h4>Support</h4>
        <ul>
          <li>Kathmandu, Nepal</li>
          <li>jobfinder@gmail.com</li>
          <li>+977 986644364333</li>
        </ul>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><Link to ={"/"}>Home</Link></li>
          <li><Link to ={"/jobs"}>Jobs</Link></li>
          {
            isAuthenticated && (<li><Link to ={"/dashboard"}>Dashboard</Link></li>
          )}
        </ul>
      </div>
      <div>
        <h4>Follow us</h4>
        <ul>
          
          <li>
          <Link to={""}>
            <span><FaSquareInstagram /></span>
            <span>Instagram</span>
          </Link>
          </li> 
          <li>
          <Link to={""}>
            <span><FaLinkedin /></span>
            <span>LinkedIn</span>
          </Link>
          </li>
          <li>
          <Link to={""}>
            <span><FaGithub /></span>
            <span>Github</span>
          </Link>
          </li>
        </ul>
      </div>
    </footer>
    <div className='copyright'>
      &copy; Copyright {new Date().getFullYear()}. All rights reserved By Samir
    </div>
    </>
  )
}

export default Footer
