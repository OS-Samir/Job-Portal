import React from 'react'
import {ClipLoader} from "react-spinners"

const Spinner = () => {
  return (
    <>
     <section style={{minHeight: "530px", display: "flex", justifyConten: "center", alignItems:"center"}}>
      <ClipLoader size={150} ariaLabel='Loading Spinner' />
      </section> 
    </>
  )
}

export default Spinner
