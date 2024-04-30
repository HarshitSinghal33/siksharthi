import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { docPageIndex, docID, setDocID, setDocPageIndex } from '../../Redux/Slice/userBookData';
import Chapters from './Chapters';
import { mode } from '../../Redux/Slice/userAppDataSlice';
import useBookPageUpdate from '../../hook/update&delete/useBookPageUpdate';
import Button from '../ui/Button';

export default function PageChanger({ bookID, userData }) {
    const dispatch = useDispatch()
    const darkMode = useSelector(mode);
    const currentDoc = useSelector(docID)
    const currentDocPageIndex = useSelector(docPageIndex)
    const { pageSetUp } = useBookPageUpdate()
    const [chapOpen, setChapOpen] = useState(false)
    const timeoutRef = useRef(null)
    const currentDocRef = useRef(null);
    const currentDocPageIndexRef = useRef(null);
    const currentBookRef = useRef(userData.bookRead.find(book => book.bookID === bookID))
    const handleChapterCompOpen = () => {
        setChapOpen(prev => !prev)
    }

    useEffect(() => {
        currentDocRef.current = currentDoc;
        currentDocPageIndexRef.current = currentDocPageIndex;
        currentBookRef.current = userData.bookRead.find(book => book.bookID === bookID)
    }, [currentDoc, currentDocPageIndex, userData])

    useEffect(() => {
        const firestoreBookPageChange = () => {
            if (currentBookRef.current.docID === currentDocRef.current && currentBookRef.current.pageNo === currentDocPageIndexRef.current) return;

            clearTimeout(timeoutRef.current);
            pageSetUp(userData, bookID, currentDocRef.current, currentDocPageIndexRef.current);
        }

        const handleUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
            firestoreBookPageChange()
        };
        window.addEventListener('beforeunload', handleUnload);

        return () => {
            firestoreBookPageChange();
            window.removeEventListener('beforeunload', handleUnload);
        }
    }, [])

    const currentShowPage = (currentDoc * 5 - 5) + currentDocPageIndex;

    const handlePageChange = (type, page) => {
        clearTimeout(timeoutRef.current)
        const newShownPage = currentShowPage + page;
        const newDoc = Math.ceil(newShownPage / 5);
        const newDocPageIndex = newShownPage - (newDoc * 5 - 5)
        if (currentDoc !== newDoc) {
            const index = type === 'next' ? 1 : 5
            dispatch(setDocPageIndex(index))
            dispatch(setDocID(newDoc))
        } else {
            dispatch(setDocPageIndex(newDocPageIndex))
        }
        timeoutRef.current = setTimeout(() => pageSetUp(userData, bookID, newDoc, newDocPageIndex), 45000);
    }
    return (
        <footer className='mt-[75px]'>
            <div className={`fixed bottom-0 w-full flex justify-evenly items-center p-3 font-bold  bg-opacity-60  rounded-tl-3xl rounded-tr-3xl backdrop-blur-lg ${darkMode ? 'shadow-dark bg-black' : 'bg-white shadow-light'}`}>
                <Button isDisabled={currentShowPage === 1} onClick={() => handlePageChange('prev', -1) } className='w-fit bg-transparent' variant={darkMode ?  'dark': 'light'}>
                    <IoMdArrowDropleftCircle size={45} />
                </Button>

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
                            Page {currentShowPage}/{currentBookRef.current?.totalBookPages}
                        </motion.div>
                    }
                </AnimatePresence>

                <Button isDisabled={currentShowPage === currentBookRef.current?.totalBookPages} onClick={() => handlePageChange('next', 1)} className='w-fit bg-transparent' variant={darkMode ? 'dark': 'light'}>
                    <IoMdArrowDroprightCircle size={45} />
                </Button>
                
            </div>
        </footer>
    )
}