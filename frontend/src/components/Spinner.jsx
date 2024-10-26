
import {ClipLoader} from "react-spinners"

const Spinner = () => {
  return (
    <>
     <section style={{minHeight: "530px", display: "flex", justifyContent: "center", alignItems:"center"}}>
      <ClipLoader size={150} aria-label='Loading Spinner' />
      </section> 
    </>
  )
}

export default Spinner;
