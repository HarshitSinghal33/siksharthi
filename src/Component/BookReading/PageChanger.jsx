import React, { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore';
import { fireStoreDb } from '../../../Firebase';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { useParams } from 'react-router-dom';
import { currentReadingPage, currentReadDoc, setDocID, setPage, } from '../../Redux/Slice/userBookData';
import { uid } from '../../Redux/Slice/userAuthSlice';
import useFetchUserData from '../../hook/useFetchUserData'
import useFetchBookInfo from '../../hook/useFetchBookInfo';
import Chapters from './Chapters';

export default function PageChanger() {
    const userUID = useSelector(uid)
    const currentDoc = useSelector(currentReadDoc)
    const { bookID } = useParams()
    const { bookRead } = useFetchUserData()
    const darkMode = useSelector((state) => state.userAppData.darkMode);
    const [chapOpen, setChapOpen] = useState(false)
    const currentPage = useSelector(currentReadingPage)
    const { currentBook } = useFetchBookInfo()
    const dispatch = useDispatch()

    const handleChapterCompOpen = () => {
        setChapOpen(prev => !prev)
    }

    const updateLocalStorage = (newPage, newDoc) => {
        const data = {
            page: newPage,
            docID: newDoc
        }
        localStorage.setItem(`${bookID}${userUID}`, JSON.stringify(data))
    }



    const updateUserBookDoc = async (newPage, newDoc) => {
        const documentRef = doc(fireStoreDb, 'users', userUID);
        const updatedArray = bookRead.map(book => book.bookID === bookID ? { ...book, pageNo: newPage, docID: newDoc } : book)
        await updateDoc(documentRef, { bookRead: updatedArray });
    }

    function handle(newPage) {
        const newDoc = Math.floor((newPage) / 5)
        if (currentDoc !== newDoc) {
            dispatch(setDocID(newDoc))
            updateUserBookDoc(newPage, newDoc)
        }
        updateLocalStorage(newPage, newDoc)
    }
    const prev = () => {
        dispatch(setPage(currentPage - 1))
        handle(currentPage - 1)
    }

    const next = () => {
        dispatch(setPage(currentPage + 1))
        handle(currentPage + 1)
    }
    return (
        <footer style={{ marginTop: '75px' }}>
            <div className={`fixed bottom-0 w-full flex justify-evenly items-center p-3 font-bold  bg-opacity-60  rounded-tl-3xl rounded-tr-3xl backdrop-blur-lg  ${darkMode ? 'shadow-dark bg-black' : 'bg-white shadow-light'}`}>
                <button disabled={currentPage + 1 === 1}  onClick={() => prev()}><IoMdArrowDropleftCircle size={45} /></button>

                <AnimatePresence mode='wait'>
                    {chapOpen
                        ? <Chapters key='chapters' handleChapterCompOpen={handleChapterCompOpen} />
                        : <motion.div
                            key='pages'
                            className='text-xl'
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                            onClick={handleChapterCompOpen}
                        >
                            Page {currentPage + 1}/{currentBook?.pages}
                        </motion.div>
                    }
                </AnimatePresence>
                <button disabled={currentBook?.pages === currentPage + 1}  onClick={() => next()}>
                    <IoMdArrowDroprightCircle size={45} />
                </button>
            </div>
        </footer>
    )
}