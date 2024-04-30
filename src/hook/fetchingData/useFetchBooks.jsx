import { useInfiniteQuery } from "react-query";
import { getDocs, collection, query, limit, startAfter, orderBy } from "firebase/firestore";
import { fireStoreDb } from "../../../Firebase";
export default function useFetchBooks() {

    const fetchBooks = async (lastDoc) => {
        const collectionRef = collection(fireStoreDb, 'books')
        let snapShotQuery;
        const docLimit = 6;

        if (lastDoc.pageParam) {
            snapShotQuery = query(collectionRef, orderBy('launchedOn', 'desc'), startAfter(lastDoc.pageParam), limit(docLimit))
        } else {
            snapShotQuery = query(collectionRef, orderBy('launchedOn', 'desc'), limit(docLimit))
        }

        const snapShot = await getDocs(snapShotQuery);
        if (snapShot.empty) {
            return { data: [], lastVisibleDoc: null }
        }
        const data = snapShot.docs.map((doc) => ({ ...doc.data() }))
        const lastVisibleDoc = snapShot.docs.length
            === docLimit ? snapShot.docs[snapShot.docs.length - 1] : null;
        return { data, lastVisibleDoc }
    }

    const { data: books, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery('books', fetchBooks, {
        getNextPageParam: (lastpage) => lastpage.lastVisibleDoc,
        staleTime: 6 * 60 * 60 * 1000,
        cacheTime: 6 * 60 * 60 * 1000,
    })
    return { books, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage }
}