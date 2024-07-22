import React from "react";
import ProductImg from "../../../../../public/product.webp"
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsCartCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function BestProduct() {
    const products = [
        {
            "name": "Product 1",
            "price": 100000,
            "description": "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
            "image": { ProductImg }
        }
    ]
    const result = []

    for (let product = 0; product <= 4; product++) {
        result.push({ ...products[0] })
    }

    console.log(result)

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="mt-24 mb-5 flex">
                <div>
                    <h1 className="text-left font-basicCommersialRegular text-2xl">BEST PRODUCT</h1>
                </div>
                <div className="ml-auto text-center">
                    <Link to="/" className="hover:text-red-500"><h3>View All</h3></Link>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-y-1 md:grid-cols-5">
                {...result.map((product, index) => (
                    <div key={index} className="max-w-xl md:max-w-60 bg-white border">
                        <a href="#">
                            <LazyLoadImage
                                alt="product"
                                src={product.image.ProductImg}
                                effect="blur"
                                wrapperProps={
                                    { style: { transitionDelay: "1s" } }
                                }>
                            </LazyLoadImage>
                        </a>
                        <div className="p-5 font-basicCommersialRegular">
                            <a href="#">
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-red-600">{product.price}</h5>
                            </a>
                            <p className="mb-3 font-normal text-[12px] text-[#432883]">{product.description}</p>
                            <div className="">
                                <button className="bg-red-600 text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-red-800">+<BsCartCheck className="text-xl text-center"></BsCartCheck></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}