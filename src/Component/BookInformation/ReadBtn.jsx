import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAddBookRead from '../../hook/update&delete/useAddBookRead'
import BtnLoader from '../Loaders/BtnLoader'

export default function ReadBtn({ currentBook, isLoading, userData }) {
  const { bookID } = useParams();
  const navigate = useNavigate()
  const { handleReadBook, isBookAddLoading } = useAddBookRead()
  const isReading = userData && userData.bookRead.some((val) => val.bookID === bookID);

  const handleSetReading = async () => {
    if (!isReading) {
      await handleReadBook(currentBook, userData, bookID)
    }
    navigate(`/readbook/${bookID}`)
  }

  const renderContent = () => {
    if (isLoading) return <BtnLoader />;
    if (isBookAddLoading) return <BtnLoader loadingStateName={'Opening'} />;
    if (isReading) return 'Continue Reading';
    return 'Start Reading';
  }

  return (
    <button disabled={isLoading} onClick={() => handleSetReading()} className='flex-grow bottom-3 mt-3 p-3 rounded-lg font-sans bg-gradient-to-b from-blue-900 via-blue-500 to-blue-300 text-white cursor-pointer max-w-[450px] font-semibold'>
      {renderContent()}
    </button>
  )
}