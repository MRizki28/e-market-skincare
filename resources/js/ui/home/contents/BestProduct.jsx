import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsCartCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import bestProductScript from "../../../scripts/home/bestProductScript";

export default function BestProduct() {
    const [data, setData] = useState([]);

    const getBestProduct = async () => {
        const product = await bestProductScript.getBestProduct();
        setData(product);
    };

    const handleAddToCart = (product) => {
        bestProductScript.handleAddToCart(product);
    }

    useEffect(() => {
        getBestProduct();
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="mt-24 mb-5 flex">
                <div>
                    <h1 className="text-left font-basicCommersialRegular text-2xl">BEST PRODUCT</h1>
                </div>
                <div className="ml-auto text-center">
                    <Link to="/" className="hover:text-red-500">
                        <h3>View All</h3>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-2 md:grid-cols-5">
                {data.map((product, index) => (
                    <div key={index} className="bg-white border flex flex-col max-w-xl md:max-w-xs">
                        <Link to={`/detail-product/${product.product_name}`}>
                            <LazyLoadImage
                                alt="product"
                                src={`uploads/product/${product.product_image}`}
                                effect="blur"
                                className="w-full h-60 object-cover"
                                wrapperProps={{ style: { transitionDelay: "1s" } }}
                            />
                        </Link>
                        <div className="p-5 flex flex-col flex-grow">
                            <Link to={`/detail-product/${product.product_name}`}>
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-red-600">{product.price}</h5>
                            </Link>
                            <p className="mb-3 font-normal text-[12px] text-[#432883]">{product.description}</p>
                            <div className="mt-auto">
                                <button onClick={handleAddToCart} className="bg-red-600 text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-red-800">
                                    +<BsCartCheck className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}