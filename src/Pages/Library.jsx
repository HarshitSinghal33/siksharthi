import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import Loader from '../Component/Loaders/Loader'
import Booklist from '../Component/Book/Booklist'
import useFetchUserData from '../hook/fetchingData/useFetchUserData'
import NoData from '../Component/NoData'
import Error from '../Component/Error'
import { motion } from 'framer-motion'

export default function Library() {
    const { userData, error, isLoading } = useFetchUserData()
    function renderContent() {
        if (isLoading) return <Loader />;

        if (error) return <Error message={error.message}/>; 

        if ((userData.bookRead && userData.bookRead.length !== 0)) return <Booklist path={'readbook'} books={userData.bookRead} handleDelete={true} />;

        return <NoData message={'Get a book from home and it will show here.'} />;
      }
    return (
        <>
            <Header headerName={'My Library'} />
            <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 0 }}
                transition={{ duration: 0.15 }}
            >
                {renderContent()}
            </motion.div>
            <Footer />
        </>
    )
}