import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../ui/home/Home";
import { Login } from "../ui/auth/Login";
import { DetailProduct } from "../ui/detailProduct/DetailProduct";
import NotFound from "../ui/404/404";
import ProtectedRoutes from "../scripts/protectedRoutes/protectedRoutes";
import ProtectedLoginRoutes from "../scripts/protectedRoutes/protectedLoginRoutes";
import { Register } from "../ui/auth/Register";
import { Distributor } from "../ui/distributor/Distributor";
import { DetailDistributor } from "../ui/distributor/detailDistributor/DetailDistributor";
import { ProductAll } from "../ui/product/ProductAll";
import { History } from "../ui/history/History";

export default function AppRoute() {
    return (
        <Routes>
            <Route path="/login" element={<ProtectedLoginRoutes><Login></Login></ProtectedLoginRoutes>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/" element={
                <Home></Home>
            }></Route>
            <Route path="/detail-product/:id" element={<ProtectedRoutes> <DetailProduct></DetailProduct></ProtectedRoutes>}></Route>
            <Route path="/404" element={<NotFound></NotFound>}></Route>
            <Route path="/distributor" element={<Distributor></Distributor>}></Route>
            <Route path="/distributor/detail/:id" element={<ProtectedRoutes><DetailDistributor></DetailDistributor></ProtectedRoutes>}></Route>
            <Route path="*" element={<Navigate to={"/404"}></Navigate>}></Route>
            <Route path="product/all" element={<ProtectedRoutes><ProductAll></ProductAll></ProtectedRoutes>}></Route>
            <Route path="/history" element={<ProtectedRoutes><History></History></ProtectedRoutes>}></Route>
        </Routes>
    )
}