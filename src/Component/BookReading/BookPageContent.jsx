import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import { docPageIndex } from '../../Redux/Slice/userBookData';
import { fSize, lang } from '../../Redux/Slice/userAppDataSlice';
import useFetchPages from '../../hook/fetchingData/useFetchPages';
import Loader from '../Loader'
import Error from '../Error';
export default function BookPageContent() {
    const { data, error, isLoading } = useFetchPages();
    const currentDocPageIndex = useSelector(docPageIndex)
    const bookFontSize = useSelector(fSize)
    const language = useSelector(lang);
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [currentDocPageIndex])

    const renderContent = () => {
        if (isLoading) return <Loader />;

        if (error) return <Error message={error.message} />;

        if (data) {
            const content = data.content[currentDocPageIndex - 1][language];
            const cleanContent = DOMPurify.sanitize(content);
            return (
                <div className='space-y-6 max-w-[900px] py-6 px-3  rounded-xl h-full'
                    style={{ fontSize: `${bookFontSize}px` }}
                    dangerouslySetInnerHTML={{ __html: cleanContent }}>
                </div>
            )
        }
    }
    return (
        <section className='flex justify-center items-center '>
            {renderContent()}
        </section>
    );
}