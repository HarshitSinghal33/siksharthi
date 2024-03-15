import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useFetchUserData from '../../hook/useFetchUserData';
import useSetRead from '../../hook/useSetRead'

export default function ReadBtn() {
  const [isReading, setIsReading] = useState(false)
  const { bookRead } = useFetchUserData()
  const { bookID } = useParams()
  const navigate = useNavigate()
  const { handleReadBook } = useSetRead()

  useEffect(() => {
    if (bookRead && bookRead.length !== 0) {
      const isBookRead = bookRead.some((val) => val.bookID === bookID);
      setIsReading(isBookRead)
    } else {
      setIsReading(false)
    }
  }, [bookRead, bookID])


  const handleSetReading = async () => {
    try {
      navigate(`/readbook/${bookID}`)
      await handleReadBook(bookRead, bookID)
    } catch (error) {
      toast.error("Book library setup failed. Please contact the developer.")
    }
  }

  const handleNavigate = () => {
    navigate(`/readbook/${bookID}`)
  }

  return (
    <button onClick={() => isReading ? handleNavigate() : handleSetReading()} className='flex-grow bottom-3 mt-3 p-3 rounded-lg font-sans bg-gradient-to-b from-blue-900 via-blue-500 to-blue-300 text-white cursor-pointer max-w-[450px] font-semibold'>
      {isReading ? 'Continue Reading' : 'Start Reading'}
    </button>
  )
}