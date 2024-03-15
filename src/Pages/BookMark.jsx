import React from 'react'
import Booklist from '../Component/Book/Booklist'
import Header from '../Component/Header';
import Loader from '../Component/Loader';
import useFetchUserData from '../hook/useFetchUserData'
import Error from '../Component/Error'
import NoData from '../Component/NoData';
export default function BookMark() {
    const { bookMark, error, isLoading } = useFetchUserData()
    function renderContent() {
        if (isLoading) {
            return <Loader />;
        } else if (error) {
            return <Error />;
        } else if (bookMark && bookMark.length !== 0) {
            return <Booklist books={bookMark} path={'bookinfo'} />;
        } else {
            return <NoData message={'No bookMark found!'} />;
        }
    }
    return (
        <>
            <Header headerName={'BookMark'} backToPath={true} />
            {renderContent()}
        </>
    )
}
