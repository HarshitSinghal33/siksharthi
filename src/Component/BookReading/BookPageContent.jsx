import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { currentReadingPage } from '../../Redux/Slice/userBookData';
import { fSize, lang } from '../../Redux/Slice/userAppDataSlice'
export default function BookPageContent({ data }) {
    const currentPage = useSelector(currentReadingPage)
    const bookFontSize = useSelector(fSize)
    const language = useSelector(lang);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [currentPage, data])

    const content = data.content[currentPage % 5][language]

    return (
        <div className='flex justify-center items-center '>
            <div className='space-y-6 max-w-[900px] py-6 px-3  rounded-xl h-full'
                style={{ fontSize: `${bookFontSize}px` }}
                dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    );
}
