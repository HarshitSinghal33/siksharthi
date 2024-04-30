import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Setting from './Setting/Setting';
import { BsFilterLeft } from "react-icons/bs";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { mode } from '../Redux/Slice/userAppDataSlice';
export default function Header({ headerName, back }) {
  const darkMode = useSelector(mode)
  const navigate = useNavigate()
  const [isSettingOpen, setIsSettingOpen] = useState(false)

  const handleSettingOpen = () => {
    setIsSettingOpen(prev => !prev)
    document.body.style.overflowY = isSettingOpen ? 'auto' : 'hidden';
  }

  return (
    <header
      className={` text-center text-lg p-3 flex items-center justify-center   bg-opacity-60 rounded-bl-lg rounded-br-lg ${darkMode ? 'shadow-headerDark bg-[#151515]' : 'shadow-headerLight bg-white'}`}
    >
      {back && <RiArrowLeftDoubleFill className='absolute left-3 cursor-pointer' size={51} onClick={() => navigate(-1)} />}

      <h2>{headerName || 'Śikṣārthī'}</h2>

      <BsFilterLeft onClick={handleSettingOpen} size={51} className='absolute right-3 top-1 cursor-pointer' />

      <AnimatePresence mode='wait'>
        {isSettingOpen && <Setting handleSettingOpen={handleSettingOpen} />}
      </AnimatePresence>
    </header>
  )
}
