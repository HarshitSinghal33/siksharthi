import { getDoc, doc } from "firebase/firestore";
import { fireStoreDb } from "../../../Firebase";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { docID } from "../../Redux/Slice/userBookData";
import { toast } from "react-toastify";
export default function useFetchPages() {
    const currentDocID = useSelector(docID);
    const { bookID } = useParams();
    const getBookData = async () => {
        const docRef = await getDoc(doc(fireStoreDb, 'books', bookID, 'pages',`doc_${currentDocID}`));
        if(!docRef.exists){
            toast.info('No data found! Contact to developer.');
            return
        }
        return docRef.data();
    };

    const { data, error, isLoading, isFetching } = useQuery([bookID, `doc_${currentDocID}`], getBookData, {
        staleTime: 6 * 60 * 60 * 1000,
        cacheTime: 6 * 60 * 60 * 1000
    });

    return { data, error, isLoading, isFetching }
}