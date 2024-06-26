import React from 'react'
import { MdLightMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../../../Redux/Slice/userAppDataSlice';
import changeLocalStorage from '../../../utils/changeLocalStorage';
import { mode } from '../../../Redux/Slice/userAppDataSlice';
import Button from '../../ui/Button';
export default function DarkModeToggle() {
  const dispatch = useDispatch()
  const darkMode = useSelector(mode)
  const handleChange = () => {
    dispatch(setDarkMode(!darkMode))
    changeLocalStorage('darkMode', !darkMode)
  }
  return (
    <div className='flexprop borderBottom'>
      <h2>Dark Mode</h2>
      <Button onClick={handleChange} className='bg-transparent text-[33px] border-2 border-solid dark:border-white dark:text-white text-black border-black w-20 h-10 rounded-md relative' >
        <AnimatePresence mode='wait'>
          {darkMode ? (
            <motion.span
              key="lightModeIcon"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className='absolute right-0 top-0'
            >
              <MdLightMode/>
            </motion.span>
          ) : (
            <motion.span
              key="darkModeIcon"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className='absolute left-0 top-0'
            >
              <CiLight/>
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  )
}