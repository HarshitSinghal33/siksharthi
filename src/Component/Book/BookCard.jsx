import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { mode, lang } from '../../Redux/Slice/userAppDataSlice';
export default function BookCard({ book }) {
    const language = useSelector(lang)
    const darkMode = useSelector(mode)
    const { available, bookID, img, [language]: { bookName, author } } = book;
    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className="relative text-center py-3 px-4 rounded-2xl border shadow-light backdrop-blur-[2px] bg-white bg-opacity-60 dark:bg-[#151515] dark:shadow-dark dark:border-none overflow-hidden">
                <Link to={`/bookInfo/${bookID}`}>
                    {!available && <div className='absolute text-white font-semibold top-0 left-0 bg-blue-500 w-full'>Available Soon</div>}
                    <img src={img} alt={bookName} />
                    <div className='mt-1'>
                        <b>{bookName}</b>
                        {author && <div>{author}</div>}
                    </div>
                </Link>
            </div>
        </div>
    )
}