import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import LogoSkincare from "../../../public/logoEskincare.png";
import { IoSearch } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { FaHome } from "react-icons/fa";

export default function Navbar() {
    return (
        <>
            <nav className=" bg-brownSkincare border-gray-200 font-basicCommersialRegular sticky top-0 z-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={LogoSkincare} className="h-14" alt="Flowbite Logo" />
                        {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-greyText">R-SKINCARE</span> */}
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse text-white">
                        <div className="flex justify-center items-center space-x-2 hover:text-greyText">
                            <CgProfile className="text-2xl"></CgProfile>
                            <a href={`${appUrl}/cms/admin/login`}>Login</a>
                        </div>
                        <div className="hidden lg:block border-white border"></div>
                        <div className="hidden lg:block">

                            <div className="flex items-center">
                                <BsCartCheck className="text-2xl"></BsCartCheck>
                            </div>
                        </div>

                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                            <li>
                                <a href="#" className="block py-2 px-3 text-white hover:text-greyText" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-white hover:text-greyText">Distributor</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-white hover:text-greyText">About</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-brownSkincare  border-t ">
                <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                    <a href="#" className="inline-flex flex-col items-center justify-center px-5  group">
                        <FaHome className="text-2xl mb-2 text-white dark:text-white group-hover:text-greyText dark:group-hover:text-greyText"></FaHome>
                        <span className="text-sm text-white dark:text-white group-hover:text-greyText dark:group-hover:text-greyText">Home</span>
                    </a>
                    <a href="#" className="inline-flex flex-col items-center justify-center px-5  group">
                        <FaHome className="text-2xl mb-2 text-white dark:text-white group-hover:text-greyText dark:group-hover:text-greyText"></FaHome>
                        <span className="text-sm text-white dark:text-white group-hover:text-greyText dark:group-hover:text-greyText">Distributor</span>
                    </a>
                    <a href="#" className="inline-flex flex-col items-center justify-center px-5  group">
                        <FaHome className="text-2xl mb-2 text-white dark:text-white group-hover:text-greyText dark:group-hover:text-greyText"></FaHome>
                        <span className="text-sm text-white dark:text-white group-hover:text-greyText dark:group-hover:text-greyText">About</span>
                    </a>
                    <a href="#" className="inline-flex flex-col items-center justify-center px-5  group">
                        <MdAddShoppingCart className="text-2xl mb-2 text-white dark:text-white group-hover:text-greyText dark:group-hover:text-greyText"></MdAddShoppingCart>
                        <span className="text-sm text-white dark:text-white group-hover:text-greyText dark:group-hover:text-greyText">Keranjang</span>
                    </a>
                </div>
            </div>
        </>

    )
}