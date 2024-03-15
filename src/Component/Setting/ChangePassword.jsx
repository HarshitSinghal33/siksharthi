import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { auth } from '../../../Firebase';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { changePasswordAsync } from '../../Redux/Slice/userAuthSlice';
import { toast } from 'react-toastify';
import Modal from '../Modal'
export default function ChangePassword() {
    const [isOpen, setIsOpen] = useState()
    const [email, setEmail] = useState()
    const dispatch = useDispatch()
    const handleOpen = () => {
        setIsOpen(prev => !prev)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            user && setEmail(user.email)
        })
        return () => unsubscribe()
    }, [])
    const handlePasswordChange = async () => {
        try {
            setIsOpen(false)
            await dispatch(changePasswordAsync(email)).unwrap()
            toast.success('Email sent successfully.')
        } catch (error) {
            toast.error('Sorry some error occurred in sending email.')
        }
    }
    return (
        <>
            <div className='cursor-pointer flex borderBottom' onClick={handleOpen}>
                <h2>Change Password</h2>
                <IoIosArrowForward className='icon' />
            </div>
            <Modal open={isOpen} handleOpen={handleOpen}>
                <h2 className='break-words'>Get a email to change Password? on {email}</h2>
                <div className="flex justify-evenly my-3 font-bold dark:text-white">
                    <button className='bg-[#6495ED] py-3 px-3 rounded-md' onClick={handleOpen}>Cancel</button>
                    <button className='bg-[#DC143C] py-3 px-3 rounded-md' onClick={handlePasswordChange}>Sent</button>
                </div>
            </Modal>
        </>
    )
}
