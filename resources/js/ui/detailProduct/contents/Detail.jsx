import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductImg from '../../../../../public/product.webp';
import { BsCartCheck } from "react-icons/bs";
import { RiBankCardFill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { LuPackageCheck } from "react-icons/lu";
import { FaMotorcycle } from "react-icons/fa";
import { MdMonetizationOn } from "react-icons/md";
export function Detail() {
    return (
        <div className="max-w-screen-xl p-4 mx-auto">
            <div className="font-basicCommersialRegular mt-5 mb-3">
                <h1>Detail Product</h1>
            </div>
            <div className="border bg-white rounded-xl">
                <div className="p-8 flex flex-wrap">
                    <div className="font-basicCommersialRegular w-full md:w-1/2 lg:w-2/5 mb-4 md:mb-0 ">
                        <div>
                            <h2 className="text-3xl font-bold">Monsterizer</h2>
                        </div>
                        <div className="mt-2">
                            <span className="text-xl text-black">Rp.10.000</span>
                        </div>
                        <div className="mt-2">
                            <p className="text-[16px] text-greyText text-justify">Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.</p>
                        </div>
                        <div className="mt-4">
                            <div>
                                <span>Pengiriman</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-5">
                                <div className="flex items-center gap-2 mt-3">
                                    <FaMotorcycle className="text-xl text-green-500" />
                                    <span className="text-greyText">Ojek</span>
                                </div>
                                <div className="flex items-center gap-2 mt-3">
                                    <LuPackageCheck className="text-xl text-orange-500" />
                                    <span className="text-greyText">COD</span>
                                </div>
                                <div className="flex items-center gap-2 mt-3">
                                    <LuPackageCheck className="text-xl text-pinkSkincare" />
                                    <span className="text-greyText">Pesawat</span>
                                </div>
                            </div>

                        </div>
                        <div className="mt-4">
                            <div>
                                <span>Pembayaran</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-5">
                                <div className="flex items-center gap-2 mt-3">
                                    <RiBankCardFill className="text-xl text-green-500"></RiBankCardFill> <span className="text-greyText">Transfer Bank</span>
                                </div>
                                <div className="flex items-center gap-2 mt-3">
                                    <LuPackageCheck className="text-xl text-orange-500"></LuPackageCheck> <span className="text-greyText">COD</span>
                                </div> <div className="flex items-center gap-2 mt-3">
                                    <MdMonetizationOn className="text-xl text-pinkSkincare"></MdMonetizationOn> <span className="text-greyText">E-monay</span>
                                </div>
                            </div>
                        </div>

                        <div className="border mt-3"></div>
                        <div className="grid grid-cols-2 gap-3 mt-11">
                            <div>
                                <button className="bg-pink-500 text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-pink-600">
                                    +<BsCartCheck className="text-xl" />
                                </button>
                            </div>
                            <div>
                                <button className="bg-blue-500 text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-blue-600">
                                    +<RiMoneyDollarBoxFill className="text-xl" />
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="w-full md:w-1/2 lg:w-[60%] flex justify-center md:justify-end">
                        <LazyLoadImage
                            alt="product"
                            src={ProductImg}
                            effect="blur"
                            className="w-[200px] h-[200px] md:w-[460px] md:h-[460px] object-cover"
                            wrapperProps={{ style: { transitionDelay: "1s" } }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
