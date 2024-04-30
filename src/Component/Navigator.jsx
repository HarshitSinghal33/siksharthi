import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { IoLibraryOutline } from "react-icons/io5";
import { IoLibrary } from "react-icons/io5";
import { RiHomeHeartFill } from "react-icons/ri";
import { RiHomeHeartLine } from "react-icons/ri";
import { mode } from '../Redux/Slice/userAppDataSlice';

export default function Navigator() {
  const darkMode = useSelector(mode);
  const { pathname } = useLocation();
  const isLibrary = pathname.toLowerCase().includes('library');
  const mainPage = [
    { pagename: 'Home', link: '/', onPageIcon: <RiHomeHeartFill />, offPageIcon: <RiHomeHeartLine /> },
    { pagename: 'Library', link: '/library', onPageIcon: <IoLibrary />, offPageIcon: <IoLibraryOutline /> }
  ]


  return (
    <div className='mt-[75px]'>
      {/* this margin is to give the margin from the other element so that i won't overlap */}
      <div className='fixed bottom-0 w-full flex items-center mt-[150px]'>
        <div className={`flex w-full p-3 font-bold justify-evenly rounded-tl-3xl rounded-tr-3xl backdrop-blur-lg  bg-opacity-60  text-2xl ${darkMode ? 'shadow-dark' : 'shadow-light'}`}>
          {mainPage.map(page => (
            <Link to={page.link} key={page.pagename} className='flex items-center gap-1.5'>
              <span>{page.pagename}</span>

              {page.pagename === 'Home' && <span className='text-4xl'>{isLibrary ? page.offPageIcon : page.onPageIcon}</span>}
              
              {page.pagename === 'Library' && <span className='text-4xl'>{isLibrary ? page.onPageIcon : page.offPageIcon}</span>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
