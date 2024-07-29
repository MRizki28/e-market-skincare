import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsCartCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import bestProductScript from "../../../scripts/home/bestProductScript";
import { truncateText } from "../../../helper/truncateText";

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

    const hasData = data.length > 0;

    const resultTrancentText = data.map((product) => 
        truncateText(product.description, 50)
    );

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="mt-24 mb-5 flex">
                <div>
                    <h1 className="text-left font-basicCommersialRegular text-2xl">PRODUCT</h1>
                </div>
                <div className={`ml-auto text-center ${!hasData ? 'text-gray-500 cursor-not-allowed' : ''}`}>
                    <Link to="/" className={`hover:text-red-500 ${!hasData ? 'pointer-events-none' : ''}`}>
                        <h3>View All</h3>
                    </Link>
                </div>
            </div>
            {data.length === 0 ? (
                
                <div className="text-center mt-10">
                    <span className="text-lg text-gray-500">Data not found</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-y-4 gap-2 md:grid-cols-5">
                    {data.map((product, index) => (
                        <div key={index} className="bg-white border flex flex-col max-w-xl md:max-w-xs">
                            <Link to={`/detail-product/${product.product_name}`}>
                                <LazyLoadImage
                                    alt="product"
                                    src={`uploads/product/${product.product_image}`}
                                    effect="blur"
                                    className="w-full h-60 object-cover p-3"
                                    wrapperProps={{ style: { transitionDelay: "1s" } }}
                                />
                            </Link>
                            <div className="p-5 flex flex-col flex-grow border-t-2">
                                <span className="text-[#bcbcbc]">{product.product_name}</span>
                                <Link to={`/detail-product/${product.product_name}`}>
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-brownSkincare">{product.price}</h5>
                                </Link>
                                <p className="mb-3 font-normal text-[12px] text-black">{resultTrancentText}</p>
                                <div className="mt-auto">
                                    <button 
                                        onClick={() => handleAddToCart(product)} 
                                        className="bg-red-600 text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-red-800"
                                    >
                                        +<BsCartCheck className="text-xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
