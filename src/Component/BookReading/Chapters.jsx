import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import useFetchBookInfo from '../../hook/useFetchBookInfo'
import { useDispatch, useSelector } from 'react-redux'
import { setPage, setDocID, currentReadingPage } from '../../Redux/Slice/userBookData'
import { motion } from 'framer-motion'
import { FaRegWindowClose } from "react-icons/fa";
import { mode } from '../../Redux/Slice/userAppDataSlice'
// import styles from './Bookread.module.css'
import NoData from '../NoData'
export default function Chapters({ handleChapterCompOpen }) {
    const darkMode = useSelector(mode)
    const dispatch = useDispatch()
    const currentPage = useSelector(currentReadingPage)
    const { currentBook } = useFetchBookInfo()
    const [currentChap, setCurrentChap] = useState()
    const handlePageChange = (newPage) => {
        handleChapterCompOpen()
        dispatch(setPage(newPage))
        dispatch(setDocID(Math.floor(newPage / 5)))
    }

    useEffect(() => {
        if (currentBook && currentBook.chapters) {

            currentBook.chapters.forEach((element, index) => {
                if (element.startedPage === currentPage) {
                    return setCurrentChap(element.chapterName)
                }
                if (element.startedPage > currentPage && currentBook.chapters[index - 1].startedPage < currentPage) {
                    return setCurrentChap(currentBook.chapters[index - 1].chapterName)
                }

            });
        }
    }, [])
// relative bottom-0 w-full flex justify-evenly items-center p-3 font-semibold bg-white bg-opacity-60  rounded-tl-3xl rounded-tr-3xl  ${darkMode ? 'dark bg-[#151515]' : ''}`}
    return ReactDOM.createPortal(
        <motion.div className='font-bold fixed w-full p-3 bottom-0 backdrop-blur-lg'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3 }}
        >
            <div className='flex flex-col items-center justify-center h-full text-center gap-6 text-xl'>
                {(currentBook && currentBook.chapters)
                    ? <>
                        {currentBook.chapters.map((cha, index) => (
                            <div key={cha.chapterName} className='cursor-pointer' style={{ color: currentChap === cha.chapterName ? 'grey' : '' }}
                                onClick={() => { handlePageChange(cha.startedPage) }}>
                                <div>Chapter {index + 1}: {cha.chapterName}</div>
                                <div>PageNo. {cha.startedPage + 1}</div>
                            </div>
                        ))}
                    </>
                    : <NoData message={"This book doesn't have chapter."} />
                }
                <div className='flex items-center gap-3 cursor-pointer' onClick={handleChapterCompOpen}>
                    <span>Close</span>
                    <FaRegWindowClose />
                </div>
            </div>
        </motion.div>,
        document.getElementById('navBarPortal')
    )
}
