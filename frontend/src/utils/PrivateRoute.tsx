import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppState } from '../store/store';

const PrivateRoute: React.FunctionComponent = (): React.ReactElement => {

    const { isAuth } = useSelector((state: AppState) => state.users, shallowEqual);
    const location = useLocation();

    useEffect(() => {
    }, []);
    
    return (
        isAuth
            ?
            <Outlet />
            :
            <Navigate to='/login' replace state={{ from: location }} />
    )
};

export default PrivateRoute;
