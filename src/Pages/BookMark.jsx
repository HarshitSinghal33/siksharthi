import React from 'react'
import Booklist from '../Component/Book/Booklist'
import Header from '../Component/Header';
import Loader from '../Component/Loader';
import useFetchUserData from '../hook/fetchingData/useFetchUserData'
import Error from '../Component/Error'
import NoData from '../Component/NoData';
export default function BookMark() {
    const { userData, error, isLoading } = useFetchUserData()
    function renderContent() {
        if (isLoading) return <Loader />;

        if (error) return <Error message={error.message}/>;
        
        if (userData.bookMark && userData.bookMark.length !== 0) return <Booklist books={userData.bookMark} />;
        
        return <NoData message={'No bookMark found!'} />
    }
    return (
        <>
            <Header headerName={'BookMark'} back={true} />
            {renderContent()}
        </>
    )
}
