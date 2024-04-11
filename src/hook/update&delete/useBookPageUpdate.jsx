import { fireStoreDb } from "../../../Firebase"
import { uid } from "../../Redux/Slice/userAuthSlice"
import { useSelector } from "react-redux"
import { doc, updateDoc } from "firebase/firestore"
import { useQueryClient } from "react-query";
import {toast} from 'react-toastify'
export default function useBookPageUpdate() {
    const userUID = useSelector(uid);
    const queryClient = useQueryClient()

    const pageSetUp = async (userData, bookID, currentDoc, currentDocPageIndex) => {
        try {
            const documentRef = doc(fireStoreDb, 'users', userUID);
            const updatedArray = userData.bookRead.map(book => book.bookID === bookID ? { ...book, pageNo: currentDocPageIndex, docID: currentDoc } : book)
            await updateDoc(documentRef, { bookRead: updatedArray });
            queryClient.setQueryData(['userData', userUID], {
                bookMark: userData.bookMark,
                bookRead: updatedArray
            })
        } catch (error) {
            toast.error(`Error Occurred in Update book page: ${error.message}`)
        }
    }

    return { pageSetUp }
}