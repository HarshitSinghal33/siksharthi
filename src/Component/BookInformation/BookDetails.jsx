import React from 'react'
import ReadBtn from './ReadBtn'
import BookMarkBtn from './BookMarkBtn'
import useFetchUserData from '../../hook/fetchingData/useFetchUserData';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { lang, fSize } from '../../Redux/Slice/userAppDataSlice';
import { uid } from '../../Redux/Slice/userAuthSlice';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

export default function BookDetails({ currentBook }) {
    const userUID = useSelector(uid)
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
                    <div className='mt-3 flex items-center justify-center gap-4'>
                        {/* is user not login than show login button */}
                        {!userUID
                            ? (<Button className=''>
                                <Link to={'/login'}>Login to read book</Link>
                            </Button>)
                            // if book available than readBtn else than Available Soon
                            : currentBook.available
                                ? <ReadBtn currentBook={currentBook} userData={userData} isLoading={isLoading} />
                                : <Button isDisabled={true} variant='secondary' buttonText={'Available Soon'} />
                        }
                        {/* if user login than only show bookmark */}
                        {(userUID && userData) && <BookMarkBtn currentBook={currentBook} userData={userData} />}
                    </div>
                </div>
            </div>
        </div>
    )
}