import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function BookMarked({ handleSettingOpen }) {
    const navigate = useNavigate();

    const handleNavigateBookMark = () => {
        handleSettingOpen()
        navigate('/bookmark')
    }

    return (
        <div className='cursor-pointer flex borderBottom' onClick={handleNavigateBookMark}>
            <h2>Book Mark </h2><IoIosArrowForward className='icon' />
        </div>
    )
}
