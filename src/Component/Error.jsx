import React from 'react'

export default function Error({message}) {
  return (
    <div className='h-[75vh] flex justify-center items-center text-center'>
     <h1>An error occurred: {message}</h1> 
    </div>
  )
}