import React from "react";
import { Route, Routes } from "react-router-dom";

export default function appRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
        </Routes>
    )
}