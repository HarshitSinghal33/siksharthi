import { doc, arrayUnion, updateDoc } from "firebase/firestore"
import { fireStoreDb } from "../../Firebase"
import { useSelector } from "react-redux"
import { useQueryClient } from "react-query"
import useFetchBookInfo from "./useFetchBookInfo"
import { uid } from "../Redux/Slice/userAuthSlice"
export default function useSetRead() {
    const { currentBook } = useFetchBookInfo()
    const queryClient = useQueryClient()
    const userUID = useSelector(uid)
    const handleReadBook = async (bookRead,bookID) => {
        try {
            const document = doc(fireStoreDb, 'users', userUID)
            const newReadingBook = {
                bookID: bookID,
                img: currentBook.img,
                english: { bookName: currentBook['english'].bookName },
                hindi: { bookName: currentBook['hindi'].bookName },
                pageNo: 0,
                docID: 0
            }
            await updateDoc(document, {
                'bookRead': arrayUnion(newReadingBook)
            })
            const updatedBookRead = [...bookRead, newReadingBook]
            queryClient.setQueriesData(['bookRead', userUID], updatedBookRead)
        } catch (error) {
            throw error
        }
    }
    return { handleReadBook }
}
