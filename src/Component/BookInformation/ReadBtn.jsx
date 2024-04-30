import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAddBookRead from '../../hook/update&delete/useAddBookRead'
import Button from '../ui/Button';

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
  return (
    <Button
      isLoading={isLoading || isBookAddLoading}
      loadingText={isBookAddLoading && '...Opening'}
      isDisabled={isLoading || isBookAddLoading}
      onClick={handleSetReading}
      buttonText={isReading ? 'Continue Reading' : 'Start Reading'}
    />
  )
}