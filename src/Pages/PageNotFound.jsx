import React from 'react'
import Header from '../Component/Header';
import { Link } from 'react-router-dom';
Link
export default function PageNotFound() {
    return (
        <>
            <Header back={true} />
            <h1 className='flex  text-center flex-col justify-center h-[81vh]  items-center'>
                <div>Page Not Found Back To <Link to={'/'} className='text-blue-600'>Home</Link></div>
            </h1>
        </>
    )
}
