import React from 'react'

export default function FormContainer({ children }) {
    return (
        <section className='font-poppins max-w-[450px] w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg backdrop-blur-[10px] border-2 border-white/10 shadow-xl py-5 px-0 bg-black text-white'>
            <div className='flex flex-col items-center'>
                {children}
            </div>
        </section>
    )
}
