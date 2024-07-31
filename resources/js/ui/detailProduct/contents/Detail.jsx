import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductImg from '../../../../../public/product.webp';
import { BsCartCheck } from "react-icons/bs";
import { RiBankCardFill, RiMoneyDollarBoxFill } from "react-icons/ri";
import DistributorImg from '../../../../../public/distributor.webp';
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { CiShop } from "react-icons/ci";
import detailProductScript from "../../../scripts/detailProduct/detailProductScript";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { FaMotorcycle } from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";

export function Detail() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const [openAcording, setOpenAcording] = useState({});

    const toggleAccordion = (index) => {
        setOpenAcording((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const getIdUrl = window.location.pathname.split('/').pop();
    const getDataById = async () => {
        const product = await detailProductScript.getDataById(getIdUrl);
        if (product.length === 0) {
            navigate('/404')
        } else {
            setData(product)
        }
    }

    useEffect(() => {
        getDataById();
    }, [])

    return (
        <div className="max-w-screen-xl p-4 mx-auto">
            <div className="font-basicCommersialRegular mt-5 mb-3">
                <h1>Detail Product</h1>
            </div>

            <div className="border bg-white rounded-xl">
                <div className="p-8 flex flex-wrap">
                    <div className="font-basicCommersialRegular w-full md:w-1/2 lg:w-2/5 mb-4 md:mb-0 ">
                        <div>
                            <h1 className="text-sm text-semiBlack font-bold">{data.product_name}</h1>
                            <span className="text-[12px] text-greyText">Kode produk: 1234567</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-sm text-priceColor">{data.priceFormat}</span>
                        </div>

                        <div className="mt-2">
                            <form action="">
                                <div>
                                    <input type="text" id="disabled-input" aria-label="disabled input" class="mb-5 bg-gray-100 border border-gray-300 text-sm rounded-lg   block w-full p-2.5 cursor-not-allowed dark:bg-gray-300 dark:border-[#e8e8e8] dark:placeholder-[#e8e8e8] dark:text-gray-400" value="Muhammad Rizki" disabled />
                                </div>
                                <div>
                                    <input type="text" id="disabled-input" aria-label="disabled input" class="mb-5 bg-gray-100 border border-gray-300 text-sm rounded-lg   block w-full p-2.5 cursor-not-allowed dark:bg-gray-300 dark:border-[#e8e8e8] dark:placeholder-[#e8e8e8] dark:text-gray-400" value="Muhammad Rizki" disabled />
                                </div>
                                <div>
                                    <input type="number" id="number" class="shadow-sm bg-gray-50 border border-gray-500 text-black text-sm rounded-lg block w-full p-2.5  dark:placeholder-gray-400 " placeholder="1" required />
                                </div>
                            </form>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-11">
                            <div>
                                <button className="bg-brownSkincare text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-orange-500">
                                    +<BsCartCheck className="text-xl" />
                                </button>
                            </div>
                            <div>
                                <button className="bg-blue-500 text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-blue-600">
                                    +<RiMoneyDollarBoxFill className="text-xl" />
                                </button>
                            </div>
                        </div>
                        <div id="accordion-flush" className="mt-3" >
                            <h2 id="accordion-flush-heading-1">
                                <button
                                    onClick={() => toggleAccordion(1)}
                                    type="button"
                                    className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-black border-b border-gray-200 dark:border-gray-400  text-sm dark:text-semiBlack gap-3"
                                    data-accordion-target="#accordion-flush-body-1"
                                    aria-expanded={!!openAcording[1]}
                                    aria-controls="accordion-flush-body-1"
                                >
                                    <span>Deskripsi Produk</span>
                                    {openAcording[1] ? (
                                        <FiMinus className="w-3 h-3 transform shrink-0" aria-hidden="true" />
                                    ) : (
                                        <FaPlus className="w-3 h-3 transform shrink-0" aria-hidden="true" />
                                    )}
                                </button>
                            </h2>
                            <div id="accordion-flush-body-1" className={`${openAcording[1] ? 'block' : 'hidden'}`} aria-labelledby="accordion-flush-heading-1">
                                <div className="py-5 border-b border-gray-200 dark:border-gray-400">
                                    <p className="mb-2 text-gray-500 dark:text-gray-400 text-[12px]">{data.description}</p>
                                </div>
                            </div>
                            <h2 id="accordion-flush-heading-2">
                                <button
                                    onClick={() => toggleAccordion(2)}
                                    type="button"
                                    className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-black border-b border-gray-200 dark:border-gray-400  text-sm dark:text-semiBlack gap-3"
                                    data-accordion-target="#accordion-flush-body-1"
                                    aria-expanded={!!openAcording[1]}
                                    aria-controls="accordion-flush-body-1"
                                >
                                    <span>Pengiriman</span>
                                    {openAcording[2] ? (
                                        <FiMinus className="w-3 h-3 transform shrink-0" aria-hidden="true" />
                                    ) : (
                                        <FaPlus className="w-3 h-3 transform shrink-0" aria-hidden="true" />
                                    )}
                                </button>
                            </h2>
                            <div id="accordion-flush-body-2" className={`${openAcording[2] ? 'block' : 'hidden'}`} aria-labelledby="accordion-flush-heading-1">
                                <div className="py-5 border-b border-gray-200 dark:border-gray-400">
                                    <div className="flex flex-col sm:flex-row sm:gap-5">
                                        <div className="flex items-center gap-2 mt-3">
                                            <FaMotorcycle className="text-sm text-green-500" />
                                            <span className="text-gray-400 text-sm">Ojek</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3">
                                            <LuPackageCheck className="text-sm text-orange-500" />
                                            <span className="text-gray-400 text-sm">COD</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-[60%] flex justify-center md:justify-end">
                        <LazyLoadImage
                            alt="product"
                            src={`${appUrl}/uploads/product/${data.product_image}`}
                            effect="blur"
                            className="w-[200px] h-[200px] md:w-[460px] md:h-[460px] object-cover"
                            wrapperProps={{ style: { transitionDelay: "1s" } }}
                        />
                    </div>
                </div>
            </div>

            <div className="border bg-white rounded-xl mt-5">
                <div className="flex flex-col md:flex-row p-5 space-y-4 md:space-y-0 md:space-x-10">
                    <div className="flex items-center space-x-4">
                        <LazyLoadImage
                            src={DistributorImg}
                            className="rounded-full w-20 h-20 object-cover"
                            effect="blur"
                            wrapperProps={{ style: { transitionDelay: "1s" } }}
                        />
                        <div className="flex flex-col justify-center">
                            <span className="text-brownSkincare font-bold text-lg">Rizki Skincare</span>
                            <div className="flex space-x-3 mt-2">
                                <button className="border border-brownSkincare px-4 py-2 bg-orange-100 hover:bg-white flex items-center space-x-2">
                                    <IoChatboxEllipsesOutline className="text-xl text-orange-700" />
                                    <span className="hidden md:inline">Chat</span>
                                </button>
                                <button className="border px-4 py-2 hover:bg-gray-200 flex items-center space-x-2">
                                    <CiShop className="text-xl text-orange-700" />
                                    <span className="hidden md:inline">Shop</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border border-gray-200 "></div>
                    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-5 md:ml-4">
                        <div className="flex justify-between md:space-x-3">
                            <span>Produk</span>
                            <span className="text-brownSkincare">40</span>
                        </div>
                        <div className="flex justify-between md:space-x-3">
                            <span>Presentasi chat</span>
                            <span className="text-brownSkincare">100%</span>
                        </div>
                        <div className="flex justify-between md:space-x-3">
                            <span>Waktu chat dibalas</span>
                            <span className="text-brownSkincare">Hitungan jam</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
