import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import Header from '../Header'
export default function SignInMessage() {
    return (
        <>
            <Header back={true} />
            <div className="flex h-[84vh] justify-center items-center">
                <div className="text-center space-y-4">
                    <h2>Welcome!</h2>
                    <h2>
                        To unlock the full features, please <Link to="/login" className='text-blue-600'>Login</Link> to your account.
                    </h2>
                    <Button className='w-fit'>
                        <Link to='/login'>Login</Link>
                    </Button>
                </div>
            </div>
        </>
    )
}
