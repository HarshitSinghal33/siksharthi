import React, { useState } from 'react'
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { logOutAsync } from '../../../Redux/Slice/userAuthSlice';
import { toast } from 'react-toastify';
import Modal from '../../Modal';
import Button from '../../ui/Button';
import { mode } from '../../../Redux/Slice/userAppDataSlice';
export default function LogOut() {
    const dispatch = useDispatch()
    const darkMode = useSelector(mode)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleModalOpen = () => {
        setIsModalOpen(prev => !prev)
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
            <Button className='flex justify-center gap-3 w-5/6  max-w-[450px]' variant={darkMode ? 'light' : 'dark'} onClick={handleModalOpen}>
                <h2>Logout</h2> 
                <TbLogout className='icon' />
            </Button>
            <Modal open={isModalOpen} handleOpen={handleModalOpen}>
                <h2>Do you Really wanna logout ?</h2>
                <div className="flex justify-evenly mt-3 gap-3 font-semibold dark:text-white">
                    <Button  onClick={handleModalOpen}>Cancel</Button>
                    <Button variant={"danger"} onClick={handleLogOut}>Logout</Button>
                </div>
            </Modal>
        </div>
    )
}