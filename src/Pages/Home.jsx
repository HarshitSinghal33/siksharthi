import React from 'react';
import Header from '../Component/Header';
import Loader from '../Component/Loader';
import Booklist from '../Component/Book/Booklist';
import Navigator from '../Component/Navigator';
import Error from '../Component/Error';
import NoData from '../Component/NoData';
import useFetchBooks from '../hook/fetchingData/useFetchBooks';
import { motion } from 'framer-motion';
import Button from '../Component/ui/Button'
export default function Home() {
  const { books, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchBooks();
  function renderContent() {
    if (isLoading) return <Loader />;

    if (error) return <Error message={error.message} />;

    if (books && books.length !== 0) {
      const allBooks = books?.pages.flatMap((page) => page.data);
      return (
      <>
        <Booklist books={allBooks} />
        {hasNextPage && <div className='flex justify-center'><Button className='w-fit' onClick={fetchNextPage} buttonText={'Load more books'} isLoading={isFetchingNextPage}/></div>}
      </>
    )}

    return <NoData message={'No book found!'} />;
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
      <Navigator />
    </>
  )
}