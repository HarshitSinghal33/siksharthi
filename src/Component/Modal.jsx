import React from 'react'
import ReactDOM from 'react-dom'
import { mode } from '../Redux/Slice/userAppDataSlice';
import { useSelector } from 'react-redux';
export default function Modal({ open, children }) {
    const darkMode = useSelector(mode)
    if (!open) return null;
    return ReactDOM.createPortal(
        <div className='z-20 fixed top-0 bg-gray-300 bg-opacity-30 w-screen h-screen flex justify-center items-center'>
            <div className={`text-center rounded-lg p-4 w-72 ${darkMode ? 'dark bg-black shadow-modalDark' : 'shadow-modalLight bg-white '}`}>
                {children}
            </div>
        </div>,
        document.getElementById('modalPortal')
    )
}