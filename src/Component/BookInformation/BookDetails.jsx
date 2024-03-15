import React from 'react'
import { useSelector } from 'react-redux';
import { lang } from '../../Redux/Slice/userAppDataSlice';
import useSetCurrentBookPage from '../../hook/useSetCurrentBookPage';
import ReadBtn from './ReadBtn'
import BookMarkBtn from './BookMarkBtn'
export default function BookDetails({ currentBook }) {
    const language = useSelector(lang);
    useSetCurrentBookPage()
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
                    <div className='space-y-3' dangerouslySetInnerHTML={{ __html: currentBook[language].about }}></div>
                    <div className='flex items-center justify-center gap-4'>
                        <ReadBtn />
                        <BookMarkBtn />
                    </div>
                </div>
            </div>
        </div>
    )
}
