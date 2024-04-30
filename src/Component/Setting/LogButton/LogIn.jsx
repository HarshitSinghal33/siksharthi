import React from 'react'
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import { mode } from '../../../Redux/Slice/userAppDataSlice';
export default function LogIn({ handleSettingOpen }) {
    const navigate = useNavigate();
    const darkMode = useSelector(mode)
    const handleNavigate = () => {
        handleSettingOpen();
        navigate('/login');
    }
    return (
        <div className='flex justify-center my-3'>
            <Button onClick={handleNavigate} variant={darkMode ? 'light' : 'dark'} className='flex justify-center gap-1 w-5/6 max-w-[450px]'>
                <h2>Login</h2>
                <TbLogout2 className='icon' />
            </Button>
        </div>
    )
}