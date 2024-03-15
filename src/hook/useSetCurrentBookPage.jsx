import { useDispatch, useSelector } from "react-redux"
import useFetchUserData from "./useFetchUserData"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { setDocID, setPage } from "../Redux/Slice/userBookData"
import { uid } from "../Redux/Slice/userAuthSlice"
export default function useSetCurrentBookPage() {
    const dispatch = useDispatch()
    const { bookRead } = useFetchUserData()
    const { bookID } = useParams()
    const userUID = useSelector(uid)
    useEffect(() => {
        const getData = localStorage.getItem(`${bookID}${userUID}`)
        if (getData) {
            const parseData = JSON.parse(getData)
            dispatch(setPage(parseFloat(parseData.page)))
            dispatch(setDocID(parseFloat(parseData.docID)))
        } else {
            if (bookRead) {
                for (const iterator of bookRead) {
                    if (iterator.bookID === bookID) {
                        dispatch(setPage(iterator.pageNo))
                        dispatch(setDocID(iterator.docID))
                    }
                }
            }
        }
    }, [bookRead])
}