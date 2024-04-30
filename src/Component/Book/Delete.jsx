import React from 'react'
import { useSelector } from 'react-redux'
import { uid } from '../../Redux/Slice/userAuthSlice';
import useDeleteBookRead from '../../hook/update&delete/useDeleteBookRead';
import Button from '../ui/Button'
import { mode } from '../../Redux/Slice/userAppDataSlice';
export default function Delete({ bookID }) {
  const { handleDeleteBook, isLoading } = useDeleteBookRead()
  const userUID = useSelector(uid);
  const darkMode = useSelector(mode);
  return (
    <Button
      onClick={() => handleDeleteBook(userUID, bookID)}
      loadingText={'...Deleting'}
      variant={darkMode ? 'light' : 'dark'}
      isLoading={isLoading}
      buttonText={'Delete'}
      className='mt-3 rounded-lg'
    />
  )
}