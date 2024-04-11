import { useQuery } from "react-query";
import { getDocs, collection, query, where } from "firebase/firestore";
import { fireStoreDb } from "../../../Firebase";
export default function useFetchBooks() {

    const fetchBooks = async () => {
        const availableBooksQuery = query(collection(fireStoreDb, 'books'), where('available', '==', true));
        const querySnapshot = await getDocs(availableBooksQuery);
        let data = [];
        querySnapshot.forEach((doc) => {
            data = [...data, doc.data()];
        });
        return data
    }

    const { data: books, error, isLoading } = useQuery('books', fetchBooks,{
        staleTime:  6 * 60 * 60 * 1000,
        cacheTime:  6 * 60 * 60 * 1000,
    })
    return { books, error, isLoading }
}
