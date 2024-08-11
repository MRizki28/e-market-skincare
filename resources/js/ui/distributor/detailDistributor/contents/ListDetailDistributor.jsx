import { CiShop } from "react-icons/ci";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import format from "../../../../helper/format";
import { truncateText } from "../../../../helper/truncateText";
import detailListDistributor from "../../../../scripts/distributor/detailListDistributor";

export function ListDetailDistributor() {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [distributor, setDistibutor] = useState([]);

    const navigate = useNavigate()
    const id_distributor = window.location.pathname.split("/").pop();

    const getlistData = async (search, page) => {
        const product = await detailListDistributor.getListData(search, page, id_distributor)
        if (product && product.data) {
            const formatHelper = new format();
            const formattedData = product.data.map((item) => ({
                ...item,
                priceFormat: formatHelper.formatCurrency(item.price),
            }));

            setData(formattedData);
            setPagination(product);
        } else {
            setData([]);
            setPagination({});
        }
    };

    const getDataDistributor = async () => {
        const distributor = await detailListDistributor.getDistributor(id_distributor)
        if (distributor.length === 0) {
            navigate('/404')
        } else {
            setDistibutor(distributor);
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        getlistData(searchQuery, page);
    };


    const searchInput = (e) => {
        setSearchQuery(e.target.value);
        getlistData(e.target.value, currentPage);
    }

    useEffect(() => {
        getlistData(searchQuery, currentPage);
        getDataDistributor();
    }, [currentPage, searchQuery]);

    return (
        <>
            <div className="max-w-screen-xl mx-auto px-6">
                <div className="border bg-white rounded-xl mt-5">
                    <div className="flex flex-col md:flex-row p-5 space-y-4 md:space-y-0 md:space-x-10">
                        <div className="flex items-center space-x-4">
                            <LazyLoadImage
                                src={`${appUrl}/uploads/distributor/${distributor.image_distributor}`}
                                className="rounded-full w-20 h-20 object-cover"
                                effect="blur"
                                wrapperProps={{ style: { transitionDelay: "1s" } }}
                            />
                            <div className="flex flex-col justify-center">
                                <span className="text-brownSkincare font-bold text-lg">{distributor.name_distributor}</span>
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
                                <span className="text-brownSkincare">{pagination.total || 0}</span>
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
                <div className="mt-4">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="border w-full p-3"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={searchInput}
                    />
                </div>
                {!data || data.length === 0 ? (
                    <div className="text-center mt-10">
                        <span className="text-lg text-semiBlack">Data not found</span>
                    </div>
                ) : (
                    <>
                        <div className="mt-5">
                            <div className="grid grid-cols-1 gap-y-4 gap-5 md:grid-cols-5">
                                {data.map((item) => (
                                    <div key={item.id} className="bg-white border flex flex-col max-w-xl md:max-w-xs">
                                        <Link to={`${appUrl}/detail-product/${item.id}`}>
                                            <LazyLoadImage
                                                alt="product"
                                                src={`${appUrl}/uploads/product/${item.product_image}`}
                                                className="w-full h-60 object-cover p-3"
                                                width="388"
                                                height="240"
                                                effect="blur"
                                                wrapperProps={{ style: { transitionDelay: "1s" } }}
                                            />
                                        </Link>
                                        <div className="p-5 flex flex-col flex-grow border-t-2">
                                            <span className="text-semiBlack">{item.product_name}</span>
                                            <Link to={`${appUrl}/detail-product/${item.id}`}>
                                                <h5 className="mb-2 text-xl font-bold tracking-tight text-brownSkincare">{item.priceFormat}</h5>
                                            </Link>
                                            <p className="mb-3 font-normal text-[12px] text-black">{truncateText(item.description, 100)}</p>
                                            <div className="mt-auto">
                                                <Link to={`${appUrl}/detail-product/${item.id}`}>
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
        </>
    );
}
