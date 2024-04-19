import { signOut } from 'next-auth/react'
import React from 'react'

const Navbar = () => {
  return (  
    <div className='w-full bg-[#232D30] h-full flex justify-end'>
        <button className="text-white me-10" onClick={()=>{signOut()}}>Sign Out</button>
    </div>
  )
}

export default Navbar