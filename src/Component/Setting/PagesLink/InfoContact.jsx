import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
export default function InfoContact({ handleSettingOpen }) {
  const navigate = useNavigate()
  const handlePageChange = () => {
    handleSettingOpen()
    navigate('/info')
  }
  return (
    <div onClick={handlePageChange} className='flex borderBottom cursor-pointer'>
      <h2>Info & Contact</h2> <IoIosArrowForward className='icon' />
    </div>
  )
}
