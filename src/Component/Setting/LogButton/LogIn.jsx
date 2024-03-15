import React from 'react'
import { TbLogout2 } from "react-icons/tb";
import { Link } from 'react-router-dom';
export default function LogIn() {
    return (
        <div className='flex justify-center my-3'>
            <button className=' gap-3 py-3 w-5/6 rounded-lg cursor-pointer text-white bg-black dark:text-black dark:bg-white max-w-[450px]'>
                <Link to={'/login'} className='flex justify-center gap-1'>
                    <h2>Login</h2> 
                    <TbLogout2 className='icon' />
                </Link>
            </button>
        </div>
    )
}