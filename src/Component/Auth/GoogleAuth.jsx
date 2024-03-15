import React from 'react'
import { googleSignup } from '../../Redux/Slice/userAuthSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
export default function GoogleAuth() {
    const dispatch = useDispatch()
    const handleGoogleSignup = async () => {
        try {
            await dispatch(googleSignup()).unwrap()
        } catch (error) {
            toast.error('Error Occurred! While Signup with google.')
        }
    }
    return (
        <div className='my-3 text-center w-full bg-[#FFFFFF45] hover:bg-[#FFFFFF81] text-[#eaf0fb] px-3 py-2 text-lg font-semibold rounded cursor-pointer' onClick={handleGoogleSignup}>Google</div>
    )
}