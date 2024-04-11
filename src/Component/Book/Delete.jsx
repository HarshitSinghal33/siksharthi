import React from 'react'
import { useSelector } from 'react-redux'
import { uid } from '../../Redux/Slice/userAuthSlice';
import BtnLoader from '../Loaders/BtnLoader';
import useDeleteBookRead from '../../hook/update&delete/useDeleteBookRead';
export default function Delete({ bookID }) {
  const { handleDeleteBook, isLoading } = useDeleteBookRead()
  const userUID = useSelector(uid)
  return (
    <button className='w-full px-4 py-2 my-3 bg-neutral-500 rounded-lg text-white' disabled={isLoading} onClick={() => handleDeleteBook(userUID,bookID)}>{isLoading ? <BtnLoader loadingStateName={'Deleting'} /> : 'Delete'} </button>
  )
}