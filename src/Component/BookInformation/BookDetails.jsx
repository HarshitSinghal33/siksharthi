import React from 'react'
import ReadBtn from './ReadBtn'
import BookMarkBtn from './BookMarkBtn'
import useFetchUserData from '../../hook/fetchingData/useFetchUserData';
import BtnLoader from '../Loaders/BtnLoader';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { lang, fSize } from '../../Redux/Slice/userAppDataSlice';

export default function BookDetails({ currentBook }) {
    const language = useSelector(lang);
    const bookFontSize = useSelector(fSize)
    const { userData, error, isLoading } = useFetchUserData()

    if (!isLoading && error) {
        toast.info(`Error Occurred: ${error.message}`);
    }

    return (
        <div className='flex justify-center'>
            <div className='flex gap-6 m-10 text-center max-w-[1080px] max-sm:m-3 max-sm:flex-col max-sm:items-center'>
                <div className='shrink-0'>
                    <img src={currentBook.img} alt={`${currentBook[language].bookName} book image`} className='max-sm:w-[180px] max-sm:h-[240px]' />
                    <div className='mt-3 font-bold'>
                        <div>{currentBook[language].bookName}</div>
                        <div>{currentBook[language].author}</div>
                    </div>
                </div>
                <div>
                    <div className='space-y-3' style={{ fontSize: `${bookFontSize}px` }} dangerouslySetInnerHTML={{ __html: currentBook[language].about }}></div>
                    <div className='flex items-center justify-center gap-4'>
                        <ReadBtn currentBook={currentBook} userData={userData} isLoading={isLoading} />
                        {isLoading ? <BtnLoader /> : <BookMarkBtn currentBook={currentBook} userData={userData} />}
                    </div>
                </div>
            </div>
        </div>
    )
}
