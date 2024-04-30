import React from 'react'
import { FaRegWindowClose } from "react-icons/fa";

export default function Header({ handleSettingOpen }) {
    return (
        <header className='border-b-2 border-black dark:border-white py-3 w-full relative'>
            <h1 className='text-center'>
                <span>Śikṣārthī</span>
                <FaRegWindowClose className='absolute right-1.5 top-4 cursor-pointer' onClick={handleSettingOpen} />
            </h1>
        </header>
    )
}
