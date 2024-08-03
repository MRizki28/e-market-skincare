import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { checkTokenValidity, login, logout } from "../../redux/slices/checkLogin";

export default function ProtectedRoutes({ children }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.checkLogin.isLoggedIn);

    useEffect(() => {
        dispatch(checkTokenValidity())
    }, [dispatch])

    return isAuthenticated ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
}
