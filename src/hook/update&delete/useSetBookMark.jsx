import { updateDoc, arrayUnion, doc, arrayRemove } from "firebase/firestore";
import { fireStoreDb } from "../../../Firebase";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { uid } from "../../Redux/Slice/userAuthSlice";

const createBookMarkData = (currentBook, bookID) => ({
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
    available: currentBook.available
})

export default function useSetBookMark(currentBook, bookID, { bookMark, bookRead } = userData) {
    const queryClient = useQueryClient()
    const userUID = useSelector(uid);
    const document = doc(fireStoreDb, 'users', userUID);
    const addBookMark = async () => {
        const newBookMarkData = createBookMarkData(currentBook, bookID);
        await updateDoc(document, { 'bookMark': arrayUnion(newBookMarkData) });

        const newUserData = { bookRead: bookRead, bookMark: [...bookMark || [], newBookMarkData] };
        queryClient.setQueryData(['userData', userUID], newUserData)
    }

    const removeBookMark = async () => {
        const deleteBookmarks = bookMark.find(post => post.bookID === bookID);
        await updateDoc(document, { 'bookMark': arrayRemove(deleteBookmarks) });
        
        const newUserData = { bookRead: bookRead, 'bookMark': bookMark.filter(post => post.bookID !== bookID) };
        queryClient.setQueryData(['userData', userUID], newUserData)
    }
    return { addBookMark, removeBookMark };
}
