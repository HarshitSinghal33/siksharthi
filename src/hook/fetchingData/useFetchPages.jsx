import { getDocs, collection, query, limit, orderBy, startAt } from "firebase/firestore";
import { fireStoreDb } from "../../../Firebase";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { docID } from "../../Redux/Slice/userBookData";
import { useEffect } from "react";
export default function useFetchPages() {
    const queryClient = useQueryClient();
    const currentDocID = useSelector(docID);
    const { bookID } = useParams();
    const getBookData = async () => {
        const myCollectionRef = collection(fireStoreDb, 'books', bookID, 'pages');

        const queryRef = query(myCollectionRef, orderBy('docID'), startAt(currentDocID - 1 || 1), limit(3));
        // if currentDoc is available fetch 3 document from it previous one
        let currentDocumentData = null;
        const querySnapshot = await getDocs(queryRef);
        if (querySnapshot.empty) {
            return;
        }
        querySnapshot.forEach((doc) => {
            if (doc.data().docID === currentDocID) {
                currentDocumentData = doc.data()
            }
            queryClient.setQueryData([bookID, doc.data().docID], doc.data())
        });
        return currentDocumentData;
    };

    const { data, error, isLoading, isFetching } = useQuery([bookID, currentDocID], getBookData, {
        staleTime: 6 * 60 * 60 * 1000,
        cacheTime: 6 * 60 * 60 * 1000
    });

    useEffect(() => {
        if(isFetching){
            queryClient.cancelQueries([bookID, currentDocID]);
        }
    }, [currentDocID])
    return { data, error, isLoading, isFetching }
}