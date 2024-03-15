import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '../../../Redux/Slice/userAppDataSlice'
import changeLocalStorage from '../../../utils/changeLocalStorage'
import { lang } from '../../../Redux/Slice/userAppDataSlice'
export default function LanguageSelector({ handleSettingOpen }) {
    const dispatch = useDispatch()
    const language = useSelector(lang)
    const handleLangChange = (e) => {
        const { value } = e.target;
        dispatch(setLanguage(value))
        changeLocalStorage('language', value)
        handleSettingOpen()
    }
    return (
        <div>
            <div className='flexprop borderBottom'>
                <h2>Book Language</h2>
                <select name="language" id="language" onChange={handleLangChange} value={language} className='p-2 dark:text-black text-white dark:bg-white rounded bg-black'>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                </select>
            </div>
        </div>
    )
}
