import React, { useState } from 'react'
import { TbLogout } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { logOutAsync } from '../../../Redux/Slice/userAuthSlice';
import { toast } from 'react-toastify';
import Modal from '../../Modal';
export default function LogOut() {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(prev => !prev)
    }
    const handleLogOut = async () => {
        try {
            await dispatch(logOutAsync()).unwrap()
            toast.success("Log out successfully")
        } catch (error) {
            toast.error(error)
        }

    }
    return (
        <div className='flex justify-center my-3'>
            <button className='flex justify-center gap-3 py-3 w-5/6 rounded-lg cursor-pointer text-white bg-black dark:text-black dark:bg-white max-w-[450px]' onClick={handleOpen}>
                <h2>Logout</h2> <TbLogout className='icon' />
            </button>
            <Modal open={isOpen} handleOpen={handleOpen}>
                <h2>Do you Really wanna logout ?</h2>
                <div className="flex justify-evenly my-3 font-semibold dark:text-white">
                    <button className='bg-[#6495ED] py-3 px-3 rounded-md' onClick={handleOpen}>Cancel</button>
                    <button className='bg-[#DC143C] py-3 px-3 rounded-md' onClick={handleLogOut}>Logout</button>
                </div>
            </Modal>
        </div>
    )
}