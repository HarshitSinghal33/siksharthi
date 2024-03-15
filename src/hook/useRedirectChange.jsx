import { useEffect, useState } from "react"
import { auth } from "../../Firebase"
import { getDoc, doc, setDoc } from "firebase/firestore";
import { fireStoreDb } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getRedirectResult } from "firebase/auth";
export default function useRedirectChange() {
    const navigate = useNavigate()
    const [isRedirectLoading,setIsRedirectLoading] = useState(false)
    useEffect(() => {
        const handleRedirectResult = async () => {
            try {
                setIsRedirectLoading(true)
                const result = await getRedirectResult(auth);
                if (result) {
                    const userDocRef = doc(fireStoreDb, 'users', result.user.uid);
                    const userDataDoc = await getDoc(userDocRef)
                    if (!userDataDoc.exists()) {
                        try {
                            const data = {
                                bookMark: [],
                                bookRead: []
                            }
                            await setDoc(userDocRef, data)
                        } catch (error) {
                            toast.error('An Internal occurred in your setup please contact to dev.')
                            return
                        }
                    }
                    navigate('/');
                }
            } catch (error) {
                toast.error('Error Occurred! while SIgnup with google')
            } finally {
                setIsRedirectLoading(false)
            }
        };

        handleRedirectResult();
    }, []);
    return isRedirectLoading
}