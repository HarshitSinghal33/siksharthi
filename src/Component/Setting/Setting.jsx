import React from 'react'
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { uid } from '../../Redux/Slice/userAuthSlice';
import { mode } from '../../Redux/Slice/userAppDataSlice';
import Header from './SettingHeader';
import InfoContact from './PagesLink/InfoContact';
import BookMarked from './PagesLink/BookMarked';
import StorySage from './ExternalLink/StorySage';
import DarkModeToggle from './Controls/DarkModeToggle'
import LanguageSelector from './Controls/LanguageSelector'
import FontSizeSelector from './Controls/FontSizeSelector';
import ChangePassword from './ChangePassword';
import LogOut from './LogButton/LogOut';
import LogIn from './LogButton/LogIn';
import NavigatorShare from './NavigatorShare';

export default function Setting({ handleSettingOpen }) {
    const userUID = useSelector(uid)
    const darkMode = useSelector(mode)

    return ReactDOM.createPortal(
        <motion.div className={`fixed h-full w-full top-0 overflow-y-auto  ${darkMode ? 'dark bg-black' : 'bg-white'}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
        >
            <Header handleSettingOpen={handleSettingOpen} />
            <DarkModeToggle />
            <LanguageSelector handleSettingOpen={handleSettingOpen} />
            <FontSizeSelector />
            <InfoContact handleSettingOpen={handleSettingOpen} />
            {userUID && <ChangePassword /> }
            {userUID && <BookMarked handleSettingOpen={handleSettingOpen} />}
            <StorySage />
            <NavigatorShare />
            {userUID ? <LogOut /> : <LogIn handleSettingOpen={handleSettingOpen}/>}
        </motion.div>,
        document.getElementById('navBarPortal')
    )
}