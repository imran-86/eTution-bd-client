import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import LoadingSpinner from '../Components/LoadingSpinner';



const PrivateRoute = ({children}) => {
    
    
    const {user,loading} = use(AuthContext);
   
    const location = useLocation();
    // console.log(location);
    

    if(loading){
        return <LoadingSpinner></LoadingSpinner>
    }
    if(!user){
        return <Navigate
        state={location.pathname}
        to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;