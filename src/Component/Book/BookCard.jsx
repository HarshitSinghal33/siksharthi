import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { mode, lang } from '../../Redux/Slice/userAppDataSlice';
import Delete from './Delete';
export default function BookCard({ path, book, handleDelete }) {
    const language = useSelector(lang)
    const darkMode = useSelector(mode)
    const { bookID, img, [language]: { bookName, author } } = book;
    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className={`text-center py-3 px-4 rounded-2xl border shadow-light backdrop-blur-[2px] bg-white bg-opacity-60 dark:bg-[#151515] dark:shadow-dark dark:border-none `}>
                <Link to={`/${path}/${bookID}`}>
                    <img src={img} alt={bookName} />
                    <div className='mt-1'>
                        <b>{bookName}</b>
                        {author && <div>{author}</div>}
                    </div>
                </Link>
                {handleDelete && <Delete bookID={book.bookID} />}
            </div>
        </div>
    )
}
