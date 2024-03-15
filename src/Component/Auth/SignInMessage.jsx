import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer'

export default function SignInMessage() {
    return (
        <>
            <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
               <div>Please <Link style={{color:'blue'}} to={'/login'}> Login</Link> to get access.</div>
            </h2>
            <Footer />
        </>
    )
}
