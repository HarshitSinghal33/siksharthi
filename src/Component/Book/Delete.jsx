import React from 'react'
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { useSelector } from 'react-redux'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { fireStoreDb } from '../../../Firebase';
import { uid } from '../../Redux/Slice/userAuthSlice';
import useFetchUserData from '../../hook/useFetchUserData'

export default function Delete({ bookID }) {
  const queryClient = useQueryClient()
  const { bookRead } = useFetchUserData()
  const userUID = useSelector(uid)

  const handleDelete = async () => {
    try {
      const document = doc(fireStoreDb, 'users', userUID)
      const updatedBookRead = bookRead.find(book => book.bookID === bookID)
      await updateDoc(document, {
        'bookRead': arrayRemove(updatedBookRead)
      })
      queryClient.setQueriesData(['bookRead', userUID], bookRead.filter(book => book.bookID !== bookID))
      localStorage.removeItem(`${bookID}${userUID}`)
    } catch (error) {
      toast.error('Error occurred in delete book, Please contact to developer or try again.')
    }
  }

  return (
    <button className='w-full px-4 py-2 my-3 bg-neutral-500 rounded-lg text-white' onClick={handleDelete}>Delete</button>
  )
}
