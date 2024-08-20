import { RiMoneyDollarBoxFill } from "react-icons/ri";
import productImage from "../../../../../public/product.webp"
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { IoStorefrontOutline } from "react-icons/io5";
export function HistoryPayment() {
    return (
        <div className="max-w-screen-xl p-7 mx-auto">
            <div className="font-basicCommersialRegular mt-5 mb-3">
                <h1>History Pesanan</h1>
            </div>
            <div>
                <input type="text" name="search" id="search" className="border w-full p-3" placeholder="Search" />
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-1 md:grid-cols-5 mt-2">
                <div className="bg-white border flex flex-col max-w-xl md:max-w-md">
                    <div className="p-2 font-basicCommersialRegular flex">
                        <div className="flex items-center space-x-1">
                            <IoStorefrontOutline className="text-xl flex" /><span className="text-[12px] pt-[2px]">Rizki skincare</span>
                        </div>
                        <div className="ml-auto"> 
                            <span className="text-green-500 text-[12px]">Success</span>
                        </div>
                    </div>
                    <Link to="#">
                        <LazyLoadImage
                            alt="product"
                            src={productImage}
                            className="w-full h-60 object-cover p-3 mt-2"
                            width="388"
                            height="240"
                            effect="blur"
                            wrapperProps={{
                                style: { transitionDelay: "1s" },
                            }}
                        />
                    </Link>
                    <div className="p-5 flex flex-col flex-grow border-t-2">
                        <span className="text-semiBlack">Toner</span>
                        <Link to="#">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-brownSkincare">Rp.200,000</h5>
                        </Link>
                        <p className="mb-3 font-normal text-[12px] text-black">Total 2 Produk: <b>Rp.1,000,000</b></p>
                        <div className="mt-auto">
                            <Link to="#">
                                <button
                                    className="bg-red-600 font-basicCommersialRegular text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-red-800"
                                >
                                    Beli lagi
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}