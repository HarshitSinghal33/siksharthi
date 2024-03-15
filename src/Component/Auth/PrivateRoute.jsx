import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignInMessage from './SignInMessage';
import { uid } from '../../Redux/Slice/userAuthSlice';
export const PrivateRoute = () => {
    const userUID = useSelector(uid)
    return (
        userUID ? <Outlet /> : <SignInMessage />
    )
}