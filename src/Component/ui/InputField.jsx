import React, { useState } from 'react'
import { IoEyeOff, IoEyeSharp } from "react-icons/io5";

export default function InputField({ type, name, error, placeHolder, register, label }) {
    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const [inputType, setInputType] = useState(type)
    const handleIsPasswordShown = () => {
        setIsPasswordShown(prev => {
            setInputType(prev ? 'password' : 'text')
            return !prev
        })
    }
    return (
        <div className='relative mb-6'>
            <label htmlFor={name} className='block font-medium text-base'>{label}</label>
            <div className='relative text-black'>
                <input className='block h-33 w-full my-3 bg-opacity-7 rounded-md text-sm font-light p-3 placeholder-black focus:outline-none' type={type === 'password' ? inputType : type} name={name} id={name} placeholder={placeHolder} {...register} />
                {type === 'password' &&
                    <span className='absolute top-1.5 right-2.5 cursor-pointer' onClick={() => handleIsPasswordShown()}>
                        {isPasswordShown
                            ? <IoEyeOff size={30}/>
                            : <IoEyeSharp size={30}/>
                        }
                    </span>
                }
            </div>

            {error && <span className='text-red-600 text-xs absolute top-full'>{error.message}</span>}
        </div>
    )
}
