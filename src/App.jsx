import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './Component/Auth/PrivateRoute'
import { AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux';
import { mode } from './Redux/Slice/userAppDataSlice';
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
import useInitialStateHandle from './hook/useInitialStateHandle';
import EmailVerifyNotification  from './Component/EmailVerifyNotification';

function App() {
  const darkMode = useSelector(mode);
  const { isEmailVerified } = useInitialStateHandle();
  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={2400} />
      <EmailVerifyNotification isEmailVerified={isEmailVerified}/>
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
            <Route path="*" element={<PageNotFound />} />
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