import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LogoEskincare from "../../../public/logo2.png";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="bg-white rounded-lg shadow mt-5">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <Link to='/' className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <LazyLoadImage
                            src={LogoEskincare}
                            className="object-cover"
                            width='208'
                            height="68"
                            alt="logo"
                        />
                        <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Flowbite
                        </span>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link to="about" className="hover:underline me-4 md:me-6">About</Link>
                        </li>
                        <li>
                            <a href="https://wa.me/081356707798?text=Halo%20admin" target="_blank" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2024 MR All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}
