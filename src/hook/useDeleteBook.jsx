import { fireStoreDb } from "../../Firebase";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
export default function useDeleteBook(bookRead, userUID, bookID) {
    const queryClient = useQueryClient()
    const handleDelete = async () => {
        try {
            const document = doc(fireStoreDb, 'users', userUID)
            const updatedBookRead = bookRead.filter(book => book.bookID !== bookID)
            await updateDoc(document, {
                'bookRead': updatedBookRead
            })
            queryClient.setQueriesData(['bookRead', userUID], updatedBookRead)
        } catch (error) {
            toast.error(error.code)
        }
    }
    return { handleDelete }
}