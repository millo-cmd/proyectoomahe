import React from 'react';
import { Navigate } from 'react-router-dom';

function PivateRoute({ element, isAuthenticated}){
    return isAuthenticated ? element : <Navigate to='/login' />;
}

export default PivateRoute;