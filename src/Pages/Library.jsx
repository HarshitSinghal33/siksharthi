import React from 'react'
import { motion } from 'framer-motion'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import Loader from '../Component/Loader'
import Booklist from '../Component/Book/Booklist'
import useFetchUserData from '../hook/useFetchUserData'
import NoData from '../Component/NoData'
import Error from '../Component/Error'

export default function Library() {
    const { bookRead, error, isLoading } = useFetchUserData()
    function renderContent() {
        if (isLoading) {
          return <Loader />;
        } else if (error) {
          return <Error />;
        } else if ((bookRead && bookRead.length !== 0)) {
          return <Booklist path={'readbook'} books={bookRead} handleDelete={true} />
        } else {
          return <NoData message={'Get a book from home and it will show here.'} />;
        }
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