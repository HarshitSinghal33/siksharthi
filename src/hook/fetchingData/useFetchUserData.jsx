import { useQuery } from "react-query"
import { getDoc, doc } from "firebase/firestore"
import { fireStoreDb } from "../../../Firebase"
import { useSelector } from "react-redux"
import { uid } from "../../Redux/Slice/userAuthSlice"
import { toast } from "react-toastify"

export default function useFetchUserData() {
    const userUID = useSelector(uid)
    const getUserData = async () => {
        const userDataDoc = await getDoc(doc(fireStoreDb, 'users', userUID))
        if (!userDataDoc.exists()) {
            toast.info('User not found, please contact to developer!')
            return null
        }
        return userDataDoc.data()
    }

    const { data: userData, error, isLoading, refetch } = useQuery({
        queryKey: ['userData', userUID],
        queryFn: getUserData,
        staleTime: 6 * 60 * 60 * 1000,
        cacheTime: 6 * 60 * 60 * 1000,
        enabled: !!userUID,
    })

    return { userData, error, isLoading, refetch }
}