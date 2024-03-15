import { getDoc, doc } from "firebase/firestore";
import { fireStoreDb } from "../../Firebase";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function useFetchBookInfo() {
    const { bookID } = useParams()
    const getBookInfo = async () => {
        try {
            const documentSnapshot = await getDoc(doc(fireStoreDb, 'books', bookID));
            if (!documentSnapshot.exists()) {
                console.log('no data found');
                return
            }
            return documentSnapshot.data()
        } catch (error) {
            toast.error(error.code)
        }

    }

    const { data: currentBook, error, isLoading } = useQuery(`${bookID}info`, getBookInfo, {
        staleTime: Infinity,
        cacheTime: 60 * 60 * 24 * 1000
    })
    return { currentBook, error, isLoading }
}