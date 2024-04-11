import React from 'react'
import BtnLoader from '../Loaders/BtnLoader'
export default function SubmitBtn({ name, isLoad }) {
  return (
    <button type='submit' disabled={isLoad} className='w-full bg-white text-black px-3 py-2 text-lg font-semibold rounded cursor-pointer my-3 flex justify-center items-center'>
      {isLoad
        ? <BtnLoader loadingStateName={'loading'}/>
        : <span>{name}</span>
      }
    </button>
  )
}
