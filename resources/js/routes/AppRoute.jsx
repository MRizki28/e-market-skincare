import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../ui/home/Home";

export default function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
        </Routes>
    )
}