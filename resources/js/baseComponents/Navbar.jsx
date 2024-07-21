import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import LogoSkincare from "../../../public/logoEskincare.png";

export default function Navbar() {
    return (
        <div>
            <div className="bg-pinkSkincare">
                <h3 className="text-black text-center p-2 font-basicCommersialRegular">Gratis Ongkir Keseluruh Palu</h3>
            </div>
            <nav className="bg-pink-300 border-gray-200 font-basicCommersialRegular">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={LogoSkincare} className="h-14" alt="Flowbite Logo" />
                        {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">R-SKINCARE</span> */}
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
                        <div className="flex justify-center items-center space-x-2">
                            <CgProfile className="text-2xl"></CgProfile>
                            <Link to="/login">Login</Link>
                        </div>
                        <div className="border-black border"></div>
                        <div className="flex items-center">
                            <BsCartCheck className="text-2xl"></BsCartCheck>
                        </div>
                    </div>
                    <div className="items-center justify-between hidden w-full md:block md:w-[50%] " id="navbar-cta">
                        <div>
                            <input type="text" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Skincare" required />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}