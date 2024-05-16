import React from 'react'
import { googleSignup } from '../../Redux/Slice/userAuthSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import Button from '../ui/Button';
export default function GoogleAuth({ isLoading }) {
    const dispatch = useDispatch()
    const handleGoogleSignup = async () => {
        try {
            await dispatch(googleSignup()).unwrap()
        } catch (error) {
            if (error === 'auth/popup-closed-by-user') {
                toast.info('You closed popup.')
            } else {
                toast.error('Error Occurred! While Signup with google.')
            }
        }
    }
    return (
        <div className='w-full px-3 mt-3'>
            <Button onClick={handleGoogleSignup} buttonText={'Google'} isLoading={isLoading} className='w-full bg-[#FFFFFF45] hover:bg-[#ffffff81] hover:opacity-100' />
        </div>
    )
}