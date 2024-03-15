import React from 'react'
import { motion } from 'framer-motion';
import Header from '../Component/Header';
import Loader from '../Component/Loader';
import Booklist from '../Component/Book/Booklist';
import Footer from '../Component/Footer';
import Error from '../Component/Error';
import NoData from '../Component/NoData';
import useFetchBooks from '../hook/useFetchBooks';

export default function Home() {
  const { books, error, isLoading } = useFetchBooks()
  function renderContent() {
    if (isLoading) {
      return <Loader />;
    } else if (error) {
      return <Error />;
    } else if (books && books.length !== 0) {
      return <Booklist books={books} path={'bookinfo'} />;
    } else {
      return <NoData message={'No book found!'} />;
    }
  }
  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 60 }}
        transition={{ duration: 0.15 }}
      >
        {renderContent()}
      </motion.div>
      <Footer />
    </>
  )
}