import { useQuery } from "react-query";
import { getDocs, collection } from "firebase/firestore";
import { fireStoreDb } from "../../Firebase";
export default function useFetchBooks() {

    const fetchBooks = async () => {
        const querySnapshot = await getDocs(collection(fireStoreDb, 'books'));
        let data = [];
        
        querySnapshot.forEach((doc) => {
            data = [...data, doc.data()];
        });
        return data
    }

    const { data: books, error, isLoading } = useQuery('books', fetchBooks,{
        staleTime: Infinity,
    })
    return { books, error, isLoading }
}
