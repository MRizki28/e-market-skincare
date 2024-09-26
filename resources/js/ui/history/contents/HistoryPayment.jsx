import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { IoStorefrontOutline } from "react-icons/io5";
import historyScript from "../../../scripts/history/historyScript";
import { useEffect, useState } from "react";
import format from "../../../helper/format";
import { loadingSpinner } from "../../../baseComponents/LoadingSpiner";
import SweetAlertService from "../../../helper/sweetAlert";
import loadingSpinnerFull from "../../../baseComponents/LoadingSpinerfull";

export function HistoryPayment() {
    const [dataHistory, setDataHistory] = useState([])
    const [pagination, setPagination] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [querySearch, setQuerySearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingPayment, setLoadingPayment] = useState(false)

    const getHistory = async (search, page) => {
        setLoading(true)
        const data = await historyScript.getHistory(search, page)
        if (data && data.data) {
            setTimeout(() => setLoading(false), 1000)
            const FormatHelper = new format()
            const formatedData = data.data.data.map(history => ({
                ...history,
                total_price_format: FormatHelper.formatCurrency(history.total_price),
                price_format: FormatHelper.formatCurrency(history.price),
                created_at_format: new Date(history.created_at).toJSON().slice(0, 10)
            }))

            setDataHistory(formatedData)
            setPagination(data.data)
        } else {
            setTimeout(() => setLoading(false), 1000)
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

    const cancelOrder = async () => {
        const btnCancelOrder = document.getElementById('btnCancelOrder')
        const idUser = btnCancelOrder.getAttribute('data-id')
        SweetAlertService.confirmedCancelOrder().then(async (result) => {
            if (result.isConfirmed) {
                const response = await historyScript.cancelOrder(idUser)
                if (response.message == 'success cancel order') {
                    SweetAlertService.cancelOrder()
                    getHistory(querySearch, currentPage)
                } else {
                    SweetAlertService.errorAlert()
                }
            }
        })
    }

    const getDataById = async () => {
        const btnPayNow = document.getElementById('btnPayNow')
        const id = btnPayNow.getAttribute('data-id')
        const response = await axios.get(`${appUrl}/v1/order/get/${id}`)
        return response.data
    }

    const payNow = async () => {
        const response = await getDataById()
        const data = response.data
        try {
            const response = await axios.post(`${appUrl}/v1/order/prepare-order`, {
                id_product: data.id_product,
                quantity: data.quantity,
            });
            const result = response.data;
            console.log(result);
            if (result.message == 'Stock product is not enough') {
                SweetAlertService.stockNotEnough();
                return;
            } else {
                const id_order = data.id;
                const { snap_token } = result.data;
                if (snap_token) {
                    window.snap.pay(snap_token, {
                        onSuccess: async function (result) {
                            setLoadingPayment(true)
                            console.log('Payment success:', result);
                            const testing = await axios.post(`${appUrl}/v1/order/update-order/${id_order}`, {
                                status: 'success'
                            })

                            console.log(testing)
                            setTimeout(() => {
                                setLoadingPayment(false)
                                SweetAlertService.successOrder().then(() => {
                                    window.location.href = '/';
                                });
                            },1000)
                        },
                        onPending: async function (result) {
                            await axios.post(`${appUrl}/v1/order/update-order/${id_order}`, {
                                status: 'pending'
                            })
                            SweetAlertService.pendingOrder().then(() => {
                                window.location.href = '/history';
                            })
                        },
                        onError: function (result) {
                            console.log('Payment failed:', result);
                            alert('Payment failed');
                        },
                        onClose: function () {
                            console.log('close')
                        }

                    });
                } else {
                    console.error('Snap token not found');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getHistory(querySearch, currentPage)
    }, [currentPage, querySearch])
    return (
        <div className="max-w-screen-xl p-7 mx-auto">
            {loadingPayment && loadingSpinnerFull()}
            <div className="font-basicCommersialRegular mt-5 mb-3">
                <h1>History Pesanan</h1>
            </div>
            <div>
                <input type="text" value={querySearch} onChange={handleSearch} name="search" id="search" className="border w-full p-3" placeholder="Search" />
            </div>
            {loading ? (
                loadingSpinner()
            ) : dataHistory.length == 0 ? (
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
                                        <IoStorefrontOutline className="text-xl flex" /><span className="text-[12px] pt-[2px]">{history.product.distributor.name_distributor}</span>
                                    </div>
                                    <div className="ml-auto">
                                        <span className={`text-[12px] ${getStatusClass(history.status)}`}>{history.status}</span>
                                    </div>
                                </div>
                                <LazyLoadImage
                                    alt="product"
                                    src={`${appUrl}/uploads/product/${history.product.product_image}`}
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
                                        {history.status == "pending" ? (
                                            <div className="mt-auto flex gap-2">
                                                <button onClick={payNow} data-id={history.id} id="btnPayNow"
                                                    className="bg-red-600 font-basicCommersialRegular text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-red-800"
                                                >
                                                    Bayar
                                                </button>
                                                <button onClick={cancelOrder} data-id={history.id} id="btnCancelOrder"
                                                    className="border border-gray-400 hover:border-red-600 font-basicCommersialRegular text-black p-2 text-sm rounded-md w-full flex justify-center"
                                                >
                                                    Batalkan
                                                </button>
                                            </div>
                                        ) : (
                                            <Link to={history.product.stock !== 0 ? `/detail-product/${history.product.id}` : '#'}
                                                className={history.product.stock != 0 ? "bg-red-600 font-basicCommersialRegular text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-red-800" : "bg-red-400 font-basicCommersialRegular text-white p-2 text-sm rounded-md w-full flex justify-center "}
                                            >
                                                {history.product.stock != 0 ? "Beli lagi" : "Stok habis"}
                                            </Link>
                                        )}
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