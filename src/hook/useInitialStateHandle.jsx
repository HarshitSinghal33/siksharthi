import { setCurrentUser } from "../Redux/Slice/userAuthSlice";
import { setBookFontSize, setDarkMode, setLanguage } from "../Redux/Slice/userAppDataSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";
export default function useInitialStateHandle() {
    const [isEmailVerified, setIsEmailVerified] = useState(null);
    const dispatch = useDispatch()

    const handleLocalStorage = () => {
        const getInitialState = localStorage.getItem('userAppData')
        if (getInitialState) {
            const parsedData = JSON.parse(getInitialState);
            const { BookFontSize, darkMode, language } = parsedData;
            dispatch(setBookFontSize(BookFontSize))
            dispatch(setDarkMode(darkMode))
            dispatch(setLanguage(language))
        } else {
            const initialState = {
                darkMode: false,
                BookFontSize: 21,
                language: 'english',
            }
            localStorage.setItem('userAppData', JSON.stringify(initialState));
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(setCurrentUser(user.uid));
                if (!user.emailVerified) {
                    const verificationReminderPeriod = localStorage.getItem('verificationReminderPeriod')
                    const currentTime = new Date().getTime();
                    
                    // if verificationReminderPeriod is not found or currentTime is greater than verificationReminderPeriod  than show email verify modal
                    if(!verificationReminderPeriod || currentTime > verificationReminderPeriod){
                        setIsEmailVerified(false);
                        // notify after 3 days
                        localStorage.setItem('verificationReminderPeriod',currentTime + (3 * 24 * 60 * 60 * 1000));
                    }
                }
            } else {
                setIsEmailVerified(null)
            }
        })
        handleLocalStorage()
        return () => unsubscribe()
    }, [])

    return { isEmailVerified }
}