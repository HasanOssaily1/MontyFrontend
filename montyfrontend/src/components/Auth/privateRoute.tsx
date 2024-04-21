
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { LogIn } from '../../redux/actions/authActions';

interface PrivateRouteProps {
    children: ReactNode; 
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const loggedIn = useSelector((state: RootState) => state.auth.value); 
    const accesstoken = localStorage.getItem("accessToken");
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    if (accesstoken != "" && accesstoken != null) {
        dispatch(LogIn());
    }

    if (!loggedIn) {
       
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <>{children}</>; 
};

export default PrivateRoute;


