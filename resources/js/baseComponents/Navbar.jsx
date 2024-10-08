import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { json, Link } from "react-router-dom";
import LogoSkincare from "../../../public/logo2.png";
import { MdAddShoppingCart } from "react-icons/md";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import logout from "../scripts/auth/logout";
import { useSelector } from "react-redux";
import { FaShop } from "react-icons/fa6";

export default function Navbar() {
    const selector = useSelector((state) => state.checkLogin)
    const login = selector.isLoggedIn

    const handleLogout = async () => {
        await logout.logout()
    }

    const dataUser = JSON.parse(localStorage.getItem('infoUser'));

    return (
        <>
            <nav className=" bg-white border-gray-200 font-basicCommersialRegular sticky top-0 z-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={LogoSkincare} className="object-cover w-[130px] md:w-[180px]" width="180" height="56" alt="Flowbite Logo" />
                        {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-red-600">R-SKINCARE</span> */}
                    </Link>
                    <div className="flex md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse text-black">
                        {login === true ? (
                            <div className="flex justify-center items-center space-x-4 ">
                                <div className="flex  space-x-2 hover:text-red-600">
                                    <CgProfile className="text-2xl"></CgProfile>
                                    <Link to="/profile/"> <span className="text-sm">{dataUser.name}</span></Link>
                                </div>
                                <div className="border-r-4 border-gray-500 h-6"></div>
                                <div className="flex justify-center items-center">
                                    <button onClick={handleLogout}>
                                        <IoIosLogOut className="text-2xl hover:text-red-600"></IoIosLogOut >
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center space-x-2 hover:text-red-600">
                                <CgProfile className="text-2xl"></CgProfile>
                                <Link to="/login"> <span className="text-sm">Login</span></Link>
                            </div>
                        )}
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-sm">
                            <li>
                                <Link to="/" className="block py-2 px-3 text-black hover:text-red-600" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link to='/distributor'  className="block py-2 px-3 text-black hover:text-red-600">Distributor</Link>
                            </li>
                            <li>
                                <Link to='/about'  className="block py-2 px-3 text-black hover:text-red-600">About</Link>
                            </li>
                            <li>
                                <Link to="/history" className={login === true ? "block py-2 px-3 text-black hover:text-red-600" :" py-2 px-3 text-black hover:text-red-600 hidden"}>History</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white  border-t ">
                <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
                    <Link to='/' className="inline-flex flex-col items-center justify-center px-5  group">
                        <FaHome className="text-2xl mb-2 text-black dark:text-black group-hover:text-red-600 dark:group-hover:text-red-600"></FaHome>
                        <span className="text-sm text-black dark:text-black group-hover:text-red-600 dark:group-hover:text-red-600">Home</span>
                    </Link>
                    <Link to='/distributor' className="inline-flex flex-col items-center justify-center px-5  group">
                        <FaShop className="text-2xl mb-2 text-black dark:text-black group-hover:text-red-600 dark:group-hover:text-red-600"></FaShop>
                        <span className="text-sm text-black dark:text-black group-hover:text-red-600 dark:group-hover:text-red-600">Distributor</span>
                    </Link>
                    <Link to='/about' className="inline-flex flex-col items-center justify-center px-5  group">
                        <FaInfoCircle className="text-2xl mb-2 text-black dark:text-black group-hover:text-red-600 dark:group-hover:text-red-600"></FaInfoCircle>
                        <span className="text-sm text-black dark:text-black group-hover:text-red-600 dark:group-hover:text-red-600">About</span>
                    </Link>
                </div>
            </div>
        </>

    )
}