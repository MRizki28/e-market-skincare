import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { checkTokenValidity } from "../../redux/slices/checkLogin";

export default function ProtectedLoginRoutes({ children }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.checkLogin.isLoggedIn);

    useEffect(() => {
        dispatch(checkTokenValidity());
    }, [dispatch]);

    return isAuthenticated ? (
        <Navigate to="/" state={{ from: location }} />
    ) : (
        children
    );
}
