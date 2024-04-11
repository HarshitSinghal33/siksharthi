import React, { useState } from 'react';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSetBookMark from '../../hook/update&delete/useSetBookMark';

export default function BookMarkBtn({ currentBook, userData }) {
  const { bookID } = useParams()
  const [isBookMark, setIsBookMark] = useState(userData.bookMark.some((val) => val.bookID === bookID))
  const { addBookMark, removeBookMark } = useSetBookMark(currentBook, bookID, userData);

  const handleBookMarkToogle = async () => {
    try {
      if (isBookMark) {
        await removeBookMark();
        setIsBookMark(false)
      } else {
        await addBookMark();
        setIsBookMark(true)
      }
    } 
    catch (error) {
      toast.info(`Error occurred in setting bookmark: ${error.message}`);
    }
  }

  return (
    <div onClick={handleBookMarkToogle} className='mt-3'>
      {isBookMark ? <FaBookmark size={24} /> : <FaRegBookmark size={24} />}
    </div>
  )
}