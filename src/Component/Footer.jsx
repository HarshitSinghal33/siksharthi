import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { IoLibraryOutline } from "react-icons/io5";
import { IoLibrary } from "react-icons/io5";
import { RiHomeHeartFill } from "react-icons/ri";
import { RiHomeHeartLine } from "react-icons/ri";
import { mode } from '../Redux/Slice/userAppDataSlice';
// import styles from './footer.module.css'

export default function Footer() {
  const darkMode = useSelector(mode)
  const [isLibrary, setIsLibrary] = useState(true)

  const location = useLocation()
  useEffect(() => {
    setIsLibrary(location.pathname.toLowerCase().includes('library'));
  }, [location])

  return (
    <div className='mt-[75px]'>
      {/* this margin is to give the margin from the other element so that i won't overlap */}
      <div className='fixed bottom-0 w-full flex items-center mt-[150px]'>
        <div className={`flex w-full p-3 font-bold justify-evenly rounded-tl-3xl rounded-tr-3xl backdrop-blur-lg  bg-opacity-60  text-2xl ${darkMode ? 'shadow-dark' : 'shadow-light'}`}>
          <Link to={'/'} className='flex items-center gap-1.5' >
            <span>Home</span>
            {isLibrary
              ? <RiHomeHeartLine size={39} />
              : <RiHomeHeartFill size={39} />}
          </Link>

          <Link to={'/library'} className='flex items-center gap-1.5' >
            <span>library</span>
            {isLibrary
              ? <IoLibrary  size={39}/>
              : <IoLibraryOutline  size={39}/>}
          </Link>

        </div>
      </div>
    </div>
  )
}
