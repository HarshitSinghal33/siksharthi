import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegWindowClose } from "react-icons/fa";
import { motion } from 'framer-motion'
import { lang } from '../../Redux/Slice/userAppDataSlice'
import { setDocPageIndex, setDocID, docPageIndex, docID } from '../../Redux/Slice/userBookData'
import NoData from '../NoData'
import useFetchBookInfo from '../../hook/fetchingData/useFetchBookInfo'
import Loader from '../Loader'
import Error from '../Error'
export default function Chapters({ handleChapterCompOpen }) {
    const dispatch = useDispatch()
    const language = useSelector(lang)
    const currentDocPageIndex = useSelector(docPageIndex);
    const currentDocID = useSelector(docID)
    const { currentBook, error, isLoading } = useFetchBookInfo()
    const [currentChap, setCurrentChap] = useState()


    const handlePageChange = (chapterDocID, chapterDocPageIndex) => {
        handleChapterCompOpen()
        dispatch(setDocPageIndex(chapterDocPageIndex))
        dispatch(setDocID(chapterDocID))
    }

    useEffect(() => {
        if (currentBook && currentBook.chapters) {
            const chapter = currentBook.chapters.find((chapter, index) => {
                const { startedPage } = chapter;
                const currentShowPage = currentDocID * 5 - 5 + currentDocPageIndex;
                return (
                    currentShowPage === startedPage
                    || currentShowPage < currentBook.chapters[index + 1]?.startedPage
                    || index === currentBook.chapters.length - 1 && currentShowPage > startedPage)
            });
            chapter && setCurrentChap(chapter.chapterName[language]);
        }
    }, [currentBook])

    const renderContent = () => {
        if (isLoading) return <Loader height={45} />
        if (error) return <Error message={error.message} />
        if (currentBook && currentBook.chapters) {
            return (
                <>
                    {currentBook.chapters.map((chapter) => {
                        const { startedPage, pageIndex, chapterName, docID } = chapter;
                        const isPresentChapter = currentChap === chapterName[language];
                        return (
                            <div key={chapterName[language]} className={`cursor-pointer ${isPresentChapter && 'text-sky-400'}`}
                                onClick={() => handlePageChange(docID, pageIndex)}>
                                <div>{chapterName[language]}</div>
                                <div>{language === 'english' ? 'PageNo.' : 'पृष्ठ सं.'} {startedPage}</div>
                            </div>
                        )
                    })}
                </>
            )
        }
        return <NoData message={"This book doesn't have chapter."}/>;
    }
    return ReactDOM.createPortal(
        <motion.div className='font-bold fixed w-full p-3 bottom-0 backdrop-blur-lg'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
        >
            <div className='flex flex-col items-center justify-center h-full text-center gap-6 text-xl'>
                {renderContent()}
                <div className='flex items-center gap-3 cursor-pointer' onClick={handleChapterCompOpen}>
                    <span>Close</span>
                    <FaRegWindowClose />
                </div> 
            </div>
        </motion.div>,
        document.getElementById('navBarPortal')
    )
}