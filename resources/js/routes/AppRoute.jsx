import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../ui/home/Home";
import { Auth } from "../ui/auth/Login";
import { DetailProduct } from "../ui/detailProduct/DetailProduct";
import NotFound from "../ui/404/404";
import ProtectedRoutes from "../scripts/protectedRoutes/protectedRoutes";
import ProtectedLoginRoutes from "../scripts/protectedRoutes/protectedLoginRoutes";

export default function AppRoute() {
    return (
        <Routes>
            <Route path="/login" element={<ProtectedLoginRoutes><Auth></Auth></ProtectedLoginRoutes>}></Route>
            <Route path="/" element={
                <Home></Home>
            }></Route>
            <Route path="/detail-product/:id" element={<ProtectedRoutes> <DetailProduct></DetailProduct></ProtectedRoutes>}></Route>
            <Route path="/404" element={<NotFound></NotFound>}></Route>
            <Route path="*" element={<Navigate to={"/404"}></Navigate>}></Route>
        </Routes>
    )
}