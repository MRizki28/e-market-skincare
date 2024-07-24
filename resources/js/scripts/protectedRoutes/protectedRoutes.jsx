import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoutes({children}) {
    const isAuthenticated = () => {
        return localStorage.getItem('token') !== null
    }

    const location = useLocation()

    return isAuthenticated() ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
    
}