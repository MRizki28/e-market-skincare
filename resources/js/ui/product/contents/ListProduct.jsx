import { Link } from 'react-router-dom'
import productImg from '../../../../../public/product.webp'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { RiMoneyDollarBoxFill } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import ProductAll from '../../../scripts/product/productAll'
import format from '../../../helper/format'
import { truncateText } from '../../../helper/truncateText'

export function ListProduct() {
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({})
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const getAllData = async (search, page) => {
        const product = await ProductAll.getAllData(search, page)
        if (product && product.data) {
            const formatHelper = new format()
            const formattedData = product.data.data.map(product => ({
                ...product,
                priceFormat: formatHelper.formatCurrency(product.price)
            }))
            setData(formattedData)
            setPagination(product.data)
        } else {
            setData([])
            setPagination({})
        }
    }

    const handlePageChange = async (page) => {
        setCurrentPage(page)
        getAllData(searchQuery, page)
    }

    const searchInput = (e) => {
        setSearchQuery(e.target.value)
        getAllData(e.target.value, currentPage)
    }

    useEffect(() => {
        getAllData(searchQuery, currentPage)
    }, [currentPage, searchQuery])

    return (
        <div className="max-w-screen-xl mx-auto px-6">
            <div className="font-basicCommersialRegular mt-5 mb-3">
                <h1>Product</h1>
            </div>
            <div>
                <input type="text" name="search" id="search" value={searchQuery} className="border w-full p-3" placeholder="Search" onChange={searchInput} />
            </div>
            <div className="mt-5">
                {data.length === 0 ? (
                    <div className="text-center mt-10">
                        <span className="text-lg text-semiBlack">Data not found</span>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-y-4 gap-5 md:grid-cols-5">
                            {data.map((product, index) => (
                                <div key={index} className="bg-white border flex flex-col max-w-xl md:max-w-xs">
                                    <Link to={`/detail-product/${product.id}`}>
                                        <LazyLoadImage
                                            alt="product"
                                            src={`${appUrl}/uploads/product/${product.product_image}`}
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
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-brownSkincare">{product.priceFormat}</h5>
                                        </Link>
                                        <p className="mb-3 font-normal text-[12px] text-black overflow-hidden text-ellipsis break-words max-h-16">
                                                {truncateText(product.description, 100)}
                                            </p>
                                        <div className="mt-auto">
                                            <Link to={`${appUrl}/detail-product/${product.id}`}>
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
                    </>
                )}
            </div>
        </div>
    )
}