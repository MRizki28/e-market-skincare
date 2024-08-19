import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductImg from '../../../../../public/product.webp';
import { RiBankCardFill, RiMoneyDollarBoxFill } from "react-icons/ri";
import detailProductScript from "../../../scripts/detailProduct/detailProductScript";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { FaMotorcycle } from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { CiShop } from "react-icons/ci";
import DistributorImg from '../../../../../public/distributor.webp';

export function Detail() {
    const [data, setData] = useState([]);
    const [openAcording, setOpenAcording] = useState({});
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

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
            navigate('/404');
        } else {
            setData(product);
        }
    };

    const dataUser = JSON.parse(localStorage.getItem('infoUser'));

    const onSubmit = async (formData) => {
        try {
            const response = await axios.post(`${appUrl}/v1/order/create`, {
                id_product: data.id,
                quantity: formData.quantity,
            });
            const result = response.data;
            const { snap_token } = result.data;
            if (snap_token) {
                window.snap.pay(snap_token, {
                    onSuccess: function (result) {
                        console.log('Payment success:', result);
                        window.location.href = '/';
                        updateStatusOrder(result.order_id, result.transaction_status, result.transaction_id);
                    },
                    onPending: function (result) {
                        console.log('Payment pending:', result);
                    },
                    onError: function (result) {
                        console.log('Payment failed:', result);
                        alert('Payment failed');
                    },
                    onClose: function () {
                        console.log('Payment closed');
                        updateStatusOrder(result.order_id, 'pending', result.transaction_id);
                    }
                });
            } else {
                console.error('Snap token not found');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatusOrder = async (order_id, transaction_status, transaction_id) => {
        try {
            await axios.post(`${appUrl}/v1/order/update`, {
                order_id,
                transaction_status,
                transaction_id,
            });
        } catch (error) {
            console.log(error);
        }
    }
    

    useEffect(() => {
        getDataById();
    }, []);

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
                            <span className="text-[12px] text-greyText">{data.product_code}</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-sm text-priceColor">{data.priceFormat}</span>
                        </div>

                        <div className="mt-2">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <input type="text" id="name" aria-label="disabled input" className="mb-5 bg-gray-100 border border-gray-300 text-sm rounded-lg   block w-full p-2.5 cursor-not-allowed dark:bg-gray-300 dark:border-[#e8e8e8] dark:placeholder-[#e8e8e8] dark:text-gray-400" defaultValue={dataUser.name} disabled />
                                </div>
                                <div>
                                    <input type="text" id="address" aria-label="disabled input" className="mb-5 bg-gray-100 border border-gray-300 text-sm rounded-lg   block w-full p-2.5 cursor-not-allowed dark:bg-gray-300 dark:border-[#e8e8e8] dark:placeholder-[#e8e8e8] dark:text-gray-400" defaultValue={dataUser.address} disabled />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        id="quantity"
                                        {...register("quantity", { required: "Quantity is required" })}
                                        className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.quantity ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.quantity && (
                                        <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>
                                    )}
                                </div>

                                <div className="mt-5">
                                    <div>
                                        <button type="submit" className="bg-black text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-gray-700">
                                            +<RiMoneyDollarBoxFill className="text-xl" />
                                        </button>
                                    </div>
                                </div>
                            </form>
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
                                    <p className="mb-2 text-black dark:text-black text-[12px]">{data.description}</p>
                                </div>
                            </div>
                            <h2 id="accordion-flush-heading-2">
                                <button
                                    onClick={() => toggleAccordion(2)}
                                    type="button"
                                    className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-black border-b border-gray-200 dark:border-gray-400  text-sm dark:text-semiBlack gap-3"
                                    data-accordion-target="#accordion-flush-body-1"
                                    aria-expanded={!!openAcording[2]}
                                    aria-controls="accordion-flush-body-1"
                                >
                                    <span>Pengiriman</span>
                                    {openAcording[2] ? (
                                        <FiMinus className="w-3 h-3 transform shrink-0 " aria-hidden="true" />
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
                                            <span className="text-black text-sm">Ojek</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3">
                                            <LuPackageCheck className="text-sm text-orange-500" />
                                            <span className="text-black text-sm">COD</span>
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
