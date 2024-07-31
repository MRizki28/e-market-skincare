import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bestProductScript from "../../../scripts/home/bestProductScript";
import { truncateText } from "../../../helper/truncateText";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function BestProduct() {
    const [data, setData] = useState([]);

    const getBestProduct = async () => {
        const product = await bestProductScript.getBestProduct();
        setData(product);
    };

    useEffect(() => {
        getBestProduct();
    }, []);

    const hasData = data.length > 0;
    return (
        <section className="max-w-screen-xl mx-auto p-3">
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
                    <span className="text-lg text-semiBlack">Data not found</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-y-4 gap-5 md:grid-cols-5">
                    {data.map((product, index) => (
                        <div key={index} className="bg-white border flex flex-col max-w-xl md:max-w-xs">
                            <Link to={`/detail-product/${product.id}`}>
                                <LazyLoadImage
                                    alt="product"
                                    src={`uploads/product/${product.product_image}`}
                                    className="w-full h-60 object-cover p-3"
                                    width="388"
                                    height="240"
                                    effect="blur"
                                    wrapperProps={{
                                        style: { transitionDelay: "1s" },
                                    }}
                                />
                            </Link>
                            <div className="p-5 flex flex-col flex-grow border-t-2">
                                <span className="text-semiBlack">{product.product_name}</span>
                                <Link to={`/detail-product/${product.id}`}>
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-brownSkincare">{product.price}</h5>
                                </Link>
                                <p className="mb-3 font-normal text-[12px] text-black">{truncateText(product.description, 100)}</p>
                                <div className="mt-auto">
                                    <Link to={`/detail-product/${product.id}`}>
                                        <button
                                            className="bg-red-600 text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-red-800"
                                        >
                                            <RiMoneyDollarBoxFill className="text-xl" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
