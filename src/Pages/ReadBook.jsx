import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDocPageIndex, setDocID } from '../Redux/Slice/userBookData';
import useFetchUserData from '../hook/fetchingData/useFetchUserData';
import Header from '../Component/Header';
import BookPageContent from '../Component/BookReading/BookPageContent';
import PageChanger from '../Component/BookReading/PageChanger';
import Error from '../Component/Error';
import Loader from '../Component/Loaders/Loader';

export default function ReadBook() {
    const { bookID } = useParams();
    const dispatch = useDispatch();
    const { userData, error, isLoading } = useFetchUserData();
    const [isBookPageSet, setIsBookPageSet] = useState(false)
    
    useEffect(() => {
        if (userData) {
            const book = userData.bookRead.find(iterator => iterator.bookID === bookID);
            dispatch(setDocPageIndex(book.pageNo))
            dispatch(setDocID(book.docID))
            setIsBookPageSet(true)
        }
    }, [userData])

    if(isLoading) return <Loader/>;

    if(error) return <Error message={error.message}/>;

    return (
        <>
            <Header headerName={'Reading'} backToPath={true} />
            {isBookPageSet && <>
                <BookPageContent />
                <PageChanger bookID={bookID} userData={userData} />
            </>}
        </>
    )
}
