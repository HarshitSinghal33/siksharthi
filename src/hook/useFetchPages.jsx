import { getDocs, collection, query, limit, orderBy, startAt } from "firebase/firestore";
import { fireStoreDb } from "../../Firebase";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentReadDoc } from "../Redux/Slice/userBookData";
import { toast } from "react-toastify";
export default function useFetchPages() {
    const queryClient = useQueryClient()
    const currentDocID = useSelector(currentReadDoc)
    const { bookID } = useParams()
    const getBookData = async () => {
        const myCollectionRef = collection(fireStoreDb, 'books', bookID, 'pages');
        const queryRef = query(myCollectionRef, orderBy('docID'), startAt(currentDocID || 0), limit(2));
        let dataabc = ''
        try {
            const querySnapshot = await getDocs(queryRef);
            if (querySnapshot.empty) {
                return;
            }
            querySnapshot.forEach((doc) => {
                if(doc.data().docID === currentDocID){
                    dataabc = doc.data()
                }
                queryClient.setQueryData([bookID, doc.data().docID], doc.data())
            });
        } catch (error) {
            toast.error(error.code)
        }
        return dataabc
    };
    const { data, error, isLoading } = useQuery([bookID, currentDocID],
        () => getBookData(),
        {
            staleTime: Infinity
        })

    return { data, error, isLoading }
}
