import { RiMoneyDollarBoxFill } from "react-icons/ri";
import productImage from "../../../../../public/product.webp"
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { IoStorefrontOutline } from "react-icons/io5";
import historyScript from "../../../scripts/history/historyScript";
import { useEffect, useState } from "react";
import format from "../../../helper/format";
import { set } from "react-hook-form";
export function HistoryPayment() {
    const [dataHistory, setDataHistory] = useState([])
    const [pagination, setPagination] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [querySearch, setQuerySearch] = useState('')

    const getHistory = async (search, page) => {
        const data = await historyScript.getHistory(search, page)
        if (data && data.data) {
            const FormatHelper = new format()
            const formatedData = data.data.data.map(history => ({
                ...history,
                total_price_format: FormatHelper.formatCurrency(history.total_price),
                price_format: FormatHelper.formatCurrency(history.product.price),
                created_at_format: new Date(history.created_at).toJSON().slice(0, 10)
            }))
            setDataHistory(formatedData)
            setPagination(data.data)
        } else {
            setDataHistory([])
            setPagination({})
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
        getHistory(querySearch, page)
    }

    const handleSearch = (e) => {
        setQuerySearch(e.target.value)
        getHistory(e.target.value, currentPage)
    }

    const getStatusClass = (status) => {
        switch (status) {
            case 'success':
                return 'text-green-500'
            case 'pending':
                return 'text-orange-500'
            default:
                break;
        }
    }
    useEffect(() => {
        getHistory(querySearch, currentPage)
    }, [currentPage, querySearch])
    return (
        <div className="max-w-screen-xl p-7 mx-auto">
            <div className="font-basicCommersialRegular mt-5 mb-3">
                <h1>History Pesanan</h1>
            </div>
            <div>
                <input type="text" value={querySearch} onChange={handleSearch} name="search" id="search" className="border w-full p-3" placeholder="Search" />
            </div>
            {dataHistory.length == 0 ? (
                <div className="text-center mt-10">
                    <span className="text-lg text-semiBlack">Data not found</span>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-y-4 gap-2 md:grid-cols-5 mt-2">
                        {dataHistory.map((history, index) => (
                            <div key={index} className="bg-white border flex flex-col max-w-xl md:max-w-md">
                                <div className="p-2 font-basicCommersialRegular flex">
                                    <div className="flex items-center space-x-1">
                                        <IoStorefrontOutline className="text-xl flex" /><span className="text-[12px] pt-[2px]">Rizki skincare</span>
                                    </div>
                                    <div className="ml-auto">
                                        <span className={`text-[12px] ${getStatusClass(history.status)}`}>{history.status}</span>
                                    </div>
                                </div>
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
                                <div className="p-5 flex flex-col flex-grow border-t-2">
                                    <div className="flex items-center">
                                        <span className="text-semiBlack">{history.product.product_name}</span>
                                        <span className="ml-auto text-[12px]">{history.created_at_format}</span>
                                    </div>
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-brownSkincare">{history.price_format}</h5>
                                    <p className="mb-3 font-normal text-[12px] text-black">Total {history.quantity} Produk: <b>{history.total_price_format}</b></p>
                                    <div className="mt-auto">
                                        <Link to="#">
                                            {history.status == "pending" ? (
                                                <div className="mt-auto flex gap-2">
                                                    <button
                                                        className="bg-red-600 font-basicCommersialRegular text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-red-800"
                                                    >
                                                        Bayar
                                                    </button>
                                                    <button
                                                        className="border border-gray-400 hover:border-red-600 font-basicCommersialRegular text-black p-2 text-sm rounded-md w-full flex justify-center"
                                                    >
                                                        Batalkan
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    className="bg-red-600 font-basicCommersialRegular text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-red-800"
                                                >
                                                    Beli lagi
                                                </button>
                                            )}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className="mt-5 flex justify-end">
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-base h-10">
                        <li>
                            <button
                                onClick={() => handlePageChange(pagination.current_page - 1)}
                                disabled={!pagination.prev_page_url}
                                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                            >
                                &laquo; Previous
                            </button>
                        </li>
                        {pagination.links && pagination.links.map((link, index) => (
                            link.url && link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;' ? (
                                <li key={index}>
                                    <button
                                        onClick={() => handlePageChange(new URL(link.url).searchParams.get('page'))}
                                        className={`flex items-center justify-center px-4 h-10 leading-tight ${link.active ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ) : null
                        ))}
                        <li>
                            <button
                                onClick={() => handlePageChange(pagination.current_page + 1)}
                                disabled={!pagination.next_page_url}
                                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                            >
                                Next &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}