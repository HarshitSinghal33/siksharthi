import { getDoc, doc } from "firebase/firestore";
import { fireStoreDb } from "../../../Firebase";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function useFetchBookInfo() {
    const { bookID } = useParams()
    const getBookInfo = async () => {
        const documentSnapshot = await getDoc(doc(fireStoreDb, 'books', bookID));
        if (!documentSnapshot.exists()) {
            toast.info('No data found');
            return
        }
        return documentSnapshot.data()
    }

    const { data: currentBook, error, isLoading } = useQuery(`${bookID}info`, getBookInfo, {
        staleTime: 6 * 60 * 60 * 1000,
        cacheTime: 6 * 60 * 60 * 1000,
    })

    return { currentBook, error, isLoading }
}