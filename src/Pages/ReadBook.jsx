import React from 'react'
import BookPageContent from '../Component/BookReading/BookPageContent';
import Header from '../Component/Header';
import useFetchPages from '../hook/useFetchPages';
import Error from '../Component/Error';
import Loader from '../Component/Loader';
import NoData from '../Component/NoData';
import PageChanger from '../Component/BookReading/PageChanger';

export default function ReadBook() {
    const { data, error, isLoading } = useFetchPages();

    function renderContent() {
        if (error) {
            return <Error />
        } else if (isLoading) {
            return <Loader />
        } else if (data) {
           return( <>
                <BookPageContent data={data} />
                <PageChanger data={data} />
            </>)
        } else {
            return <NoData message={'Content not found! Please contact to developer.'} />
        }
    }
    return (
        <>
            <Header headerName={'Reading'} backToPath={true} />
            {renderContent()}
        </>
    )
}