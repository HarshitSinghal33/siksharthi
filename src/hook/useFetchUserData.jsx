import { useQueryClient, useQuery } from "react-query"
import { getDoc, doc } from "firebase/firestore"
import { fireStoreDb } from "../../Firebase"
import { useSelector } from "react-redux"
import { uid } from "../Redux/Slice/userAuthSlice"
export default function useFetchUserData() {
    const queryClient = useQueryClient()

    const userUID = useSelector(uid)
    const getUserData = async () => {
        const userDataDoc = await getDoc(doc(fireStoreDb, 'users', userUID))

        if (!userDataDoc.exists()) {
            console.log('not found')
            return null
        }
        return userDataDoc.data()
    }

    const { error, isLoading } = useQuery({
        queryKey: ['userData', userUID],
        queryFn: getUserData,
        staleTime: Infinity,
        enabled: !!userUID,
        onSuccess: (data) => {
            queryClient.setQueryData(['bookMark', userUID], data.bookMark)
            queryClient.setQueryData(['bookRead', userUID], data.bookRead)
        }
    })


    // we build different query for bookmark and bookread becuase updating data in one thing will not render other one component.

    const { data: bookMark } = useQuery(['bookMark', userUID], {
        queryFn: () => queryClient.getQueryData(['bookMark', userUID]),
        enabled: false,
    });
    const { data: bookRead } = useQuery(['bookRead', userUID], {
        queryFn: () => queryClient.getQueryData(['bookRead', userUID]),
        enabled: false,
    });
    return { bookMark, bookRead, error, isLoading }
}