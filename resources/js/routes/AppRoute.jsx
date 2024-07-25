import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../ui/home/Home";
import { Auth } from "../ui/auth/Auth";
import { DetailProduct } from "../ui/detailProduct/DetailProduct";
import NotFound from "../ui/404/404";

export default function AppRoute() {
    return (
        <Routes>
            <Route path="/login" element={<Auth></Auth>}></Route>
            <Route path="/" element={
                <Home></Home>
            }></Route>
            <Route path="/detail-product/:product_name" element={<DetailProduct></DetailProduct>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
    )
}