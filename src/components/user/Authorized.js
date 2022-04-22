import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Authorized() {
    const location = useLocation();
    const userState = useSelector((state) => state.handleUser);

    if(!userState || !userState?.accessToken) {
        return <Navigate to="/login"  state={{ from: location }} replace />
    }

    return(
        <Outlet />
    )
}