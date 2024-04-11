import { doc, arrayUnion, updateDoc } from "firebase/firestore"
import { fireStoreDb } from "../../../Firebase"
import { useSelector } from "react-redux"
import { useQueryClient } from "react-query"
import { uid } from "../../Redux/Slice/userAuthSlice"
import { useState } from "react"
import { toast } from "react-toastify"
export default function useAddBookRead() {
    const [isBookAddLoading,setIsBookAddLoading] = useState(false)
    const queryClient = useQueryClient()
    const userUID = useSelector(uid)
    const handleReadBook = async (currentBook, {bookMark,bookRead} = userData, bookID) => {
        setIsBookAddLoading(true)
        try {
            const document = doc(fireStoreDb, 'users', userUID)
            const newReadingBook = {
                bookID: bookID,
                img: currentBook.img,
                english: { bookName: currentBook['english'].bookName },
                hindi: { bookName: currentBook['hindi'].bookName },
                pageNo: 1,
                docID: 1,
                totalBookPages: currentBook.pages
            }
            await updateDoc(document, {
                'bookRead': arrayUnion(newReadingBook)
            })
            const updatedBookRead = [...bookRead, newReadingBook]
            queryClient.setQueriesData(['userData', userUID], {
                bookMark:bookMark,
                bookRead:updatedBookRead
            })
        } catch (error) {
            toast.error(`Error Occurred in Add book in database: ${error.message} `)
        } finally {
            setIsBookAddLoading(false)
        }
    }
    return { handleReadBook, isBookAddLoading }
}
