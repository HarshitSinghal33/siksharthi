import React from 'react'
import Button from '../ui/Button'
import { useSelector } from 'react-redux'
import { isLoading } from '../../Redux/Slice/userAuthSlice'
import GoogleAuth from './GoogleAuth'
import { Link } from 'react-router-dom'
export default function AuthFormContainer({ children, submit, formName, submitButtonText, isGoogleAuth, navigationDescription, navigationPath, navigationText }) {
    const isLoad = useSelector(isLoading)
    return (
        <section className='font-poppins flex h-screen justify-center items-center'>
            <div className='flex flex-col items-center max-w-[450px] w-full rounded-lg border-2 border-white/10 shadow-xl py-5 bg-black text-white'>
                <form onSubmit={submit} className='px-3 w-full'>
                    <h3 className='text-center'>{formName}</h3>
                    {children}
                    <Button
                        variant='light'
                        type='submit'
                        isLoading={isLoad}
                        buttonText={submitButtonText}
                    />
                </form>
                {isGoogleAuth && <GoogleAuth />}
                <div className='text-center mt-3'>
                    <span>{navigationDescription} </span>
                    <Link to={navigationPath} className='underline'>{navigationText}</Link>
                </div>
            </div>
        </section>
    )
}
