import { updateDoc, arrayUnion, doc } from "firebase/firestore";
import { fireStoreDb } from "../../Firebase";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import useFetchBookInfo from "./useFetchBookInfo";
import { uid } from "../Redux/Slice/userAuthSlice";

export default function useSetBookMark() {
    const { currentBook } = useFetchBookInfo()
    const queryClient = useQueryClient()
    const userUID = useSelector(uid)
    const document = doc(fireStoreDb, 'users', userUID);
    const addBookMark = async (bookID, bookMark) => {
        const newData = {
            img: currentBook.img,
            english: {
                bookName: currentBook['english'].bookName,
                author: currentBook['english'].author
            },
            hindi: {
                bookName: currentBook['hindi'].bookName,
                author: currentBook['hindi'].author
            },
            bookID: bookID,
        }

        await updateDoc(document, { 'bookMark': arrayUnion(newData) });
        queryClient.setQueryData(['bookMark', userUID], [...bookMark ||[], newData])
    }

    const removeBookMark = async (bookID, bookMark) => {
        const updatedBookmarks = bookMark.filter(post => post.bookID !== bookID);
        await updateDoc(document, { 'bookMark': updatedBookmarks });
        queryClient.setQueryData(['bookMark', userUID], updatedBookmarks)
    }
    return { addBookMark, removeBookMark };
}
