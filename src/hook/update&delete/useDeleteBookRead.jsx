import { fireStoreDb } from "../../../Firebase";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
export default function useDeleteBookRead() {
    const queryClient = useQueryClient()
    const [isLoading,setIsLoading] = useState(false)
    const handleDeleteBook = async (userUID, bookID) => {
        setIsLoading(true)
        const userData = queryClient.getQueryData(['userData', userUID]);
        try {
            const document = doc(fireStoreDb, 'users', userUID)
            const removeBookRead = userData.bookRead.find(book => book.bookID === bookID)
            await updateDoc(document, {
                'bookRead': arrayRemove(removeBookRead)
            })
            queryClient.setQueryData(['userData', userUID], {
                bookMark: userData.bookMark,
                bookRead: userData.bookRead.filter(book => book.bookID !== bookID)
            })
        } catch (error) {
            toast.error(`Error Occurred in delete book: ${error.message}`)
        } finally {
            setIsLoading(false)
        }
    }
    return { handleDeleteBook, isLoading }
}