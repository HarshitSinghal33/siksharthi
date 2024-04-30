import { getDoc, doc } from "firebase/firestore"
import { useQuery } from "react-query"
import { fireStoreDb } from "../../../Firebase"
import { toast } from "react-toastify";

export default function useFetchUsageInfo() {
    const getData = async () => {
        const snapShot = await getDoc(doc(fireStoreDb, 'appdata', 'info'));
        if (!snapShot.exists) {
            toast.error('Info not found! Please contact to developer.')
            return
        }
        return snapShot.data()
    }
    const { data: info, error, isLoading } = useQuery('usageInfo', getData, {
        staleTime: 60 * 60 * 1000,
        cacheTime: 60 * 60 * 1000
    })
    return { info, error, isLoading }
}