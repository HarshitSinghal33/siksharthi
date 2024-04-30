import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './Component/Auth/PrivateRoute'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../Firebase'
import { setCurrentUser } from './Redux/Slice/userAuthSlice'
import { mode, setBookFontSize, setDarkMode, setLanguage } from './Redux/Slice/userAppDataSlice';
import { onAuthStateChanged } from 'firebase/auth'
import { ToastContainer } from 'react-toastify';
const Home = lazy(() => import('./Pages/Home'))
const Library = lazy(() => import('./Pages/Library'))
const BookInfo = lazy(() => import('./Pages/BookInfo'))
const ForgetPassword = lazy(() => import('./Pages/Account/ForgetPassword'))
const ReadBook = lazy(() => import('./Pages/ReadBook'))
const BookMark = lazy(() => import('./Pages/BookMark'))
const Login = lazy(() => import('./Pages/Account/Login'))
const Signup = lazy(() => import('./Pages/Account/Signup'));
const UsageInfo = lazy(() => import('./Pages/UsageInfo'));
const PageNotFound = lazy(() => import('./Pages/PageNotFound'))
import Loader from './Component/Loader'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector(mode);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      user && dispatch(setCurrentUser(user.uid))
    })
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
    return () => unsubscribe()
  }, [])


  useEffect(() => {
    document.body.classList.toggle('dark')
  }, [darkMode])

  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={2400} />
      <AnimatePresence mode='wait'>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/info' element={<UsageInfo />} />
            <Route path='/bookinfo/:bookID' element={<BookInfo />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />
            <Route path="*" element={<PageNotFound/>} />
            <Route element={<PrivateRoute />}>
              <Route path='/library' element={<Library />} />
              <Route path='/readbook/:bookID' element={<ReadBook />} />
              <Route path='/bookmark' element={<BookMark />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App