import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../ui/home/Home";
import { Auth } from "../ui/auth/Auth";

export default function AppRoute() {
    return (
        <Routes>
            <Route path="/login" element={<Auth></Auth>}></Route>
            <Route path="/" element={
                <Home></Home>
            }></Route>
        </Routes>
    )
}