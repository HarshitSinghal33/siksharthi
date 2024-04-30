import React, { useState } from 'react';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSetBookMark from '../../hook/update&delete/useSetBookMark';
import Button from '../ui/Button';

export default function BookMarkBtn({ currentBook, userData }) {
  const { bookID } = useParams()
  const [isBookMark, setIsBookMark] = useState(userData.bookMark.some((val) => val.bookID === bookID))
  const { addBookMark, removeBookMark } = useSetBookMark(currentBook, bookID, userData);

  const handleBookMarkToogle = async () => {
    try {
      if (isBookMark) {
        try {
          await removeBookMark();
          setIsBookMark(false);
          toast.info('Bookmark Removed')
        } catch (error) {
          toast.error(`An unexpexted error occurred!: ${error.message}`)
        }
      } else {
        try {
          await addBookMark();
          setIsBookMark(true);
          toast.info('Bookmark Added')
        } catch (error) {
          toast.error(`An unexpexted error occurred!: ${error.message}`)
        }
      }
    }
    catch (error) {
      toast.info(`Error occurred in setting bookmark: ${error.message}`);
    }
  }

  return (
    <Button onClick={handleBookMarkToogle} variant={'secondary'} className='w-fit'>
      {isBookMark ? <FaBookmark size={24} /> : <FaRegBookmark size={24} />}
    </Button>
  )
}