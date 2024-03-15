import React from 'react'

export default function NoData({message}) {
    return (
        <div className='flex h-[81vh] justify-center items-center text-center'>
            <h1>{message}</h1>
        </div>
    )
}