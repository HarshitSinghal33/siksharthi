import React from 'react'
import Header from "../Component/Header"
import BookDetails from '../Component/BookInformation/BookDetails'
import useFetchBookInfo from '../hook/fetchingData/useFetchBookInfo'
import Error from '../Component/Error'
import Loader from '../Component/Loaders/Loader'

export default function BookInfo() {
    const { currentBook, error, isLoading } = useFetchBookInfo()
    return (
        <>
            <Header headerName={'Book Information'} backToPath={true} /> 
            {error && <Error message={error.message}/>}
            {isLoading && <Loader/>}
            {currentBook && <BookDetails currentBook={currentBook}/>}
        </>
    )
}
