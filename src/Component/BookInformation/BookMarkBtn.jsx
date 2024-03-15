import React, { useState, useEffect } from 'react';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSetBookMark from '../../hook/useSetBookMark';
import useFetchUserData from '../../hook/useFetchUserData';

export default function BookMarkBtn() {
  const { bookID } = useParams()
  const { bookMark } = useFetchUserData()
  const [isBookMark, setIsBookMark] = useState(false)
  const { addBookMark, removeBookMark } = useSetBookMark()


  // this useEffect will is book is Marked or not everytime the book mark changes
  useEffect(() => {
    if (bookMark && bookMark.length !== 0) {
      const isBookMarked = bookMark.some((val) => val.bookID === bookID);
      setIsBookMark(isBookMarked);
    } else {
      setIsBookMark(false)
    }
  }, [bookMark])




  const handleAddBookMark = async () => {
    try {
      await addBookMark(bookID, bookMark)
    } catch (error) {
      toast.error('Error occurred in adding book mark. Please contact to developer.')
    }
  }

  const handleRemoveBookMark = async () => {
    try {
      await removeBookMark(bookID, bookMark)
    } catch (error) {
      toast.error('Error occurred in removing book mark. Please contact to developer.')
    }
  }

  return (
    <div  onClick={() => isBookMark ? handleRemoveBookMark() : handleAddBookMark()} className='mt-3'>
      {isBookMark ? <FaBookmark size={24} /> : <FaRegBookmark size={24}/>}
    </div>
  )
}