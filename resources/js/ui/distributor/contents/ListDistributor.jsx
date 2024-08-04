import { CiShop } from "react-icons/ci";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import DistributorImg from '../../../../../public/distributor.webp';
import { useEffect, useState } from "react";
import axios from "axios";
import listDistributor from "../../../scripts/distributor/listDistributor";

export function ListDistributor() {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const getlistData = async (search, page) => {
        const distributor = await listDistributor.getData(search, page);
        setData(distributor.data);
        setPagination(distributor);
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
    }, [currentPage, searchQuery]);

    return (
        <>
            <div className="max-w-screen-xl p-7 mx-auto">
                <div className="font-basicCommersialRegular mt-5 mb-3">
                    <h1>Detail Product</h1>
                </div>
                <div>
                    <input type="text" value={searchQuery} name="search" id="search" className="border w-full p-3" placeholder="Search" onChange={searchInput} />
                </div>
                {!data ? (
                    <div className="text-center mt-10">
                        <span className="text-lg text-semiBlack">Data not found</span>
                    </div>
                ) : (
                    <>
                        {data.map((item) => (
                            <div key={item.id} className="border bg-white rounded-xl mt-5">
                                <div className="flex flex-col md:flex-row p-5 space-y-4 md:space-y-0 md:space-x-10">
                                    <div className="flex items-center space-x-4">
                                        <LazyLoadImage
                                            src={DistributorImg}
                                            className="rounded-full w-20 h-20 object-cover"
                                            effect="blur"
                                            wrapperProps={{ style: { transitionDelay: "1s" } }}
                                        />
                                        <div className="flex flex-col justify-center">
                                            <span className="text-brownSkincare font-bold text-lg">{item.name_distributor}</span>
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
                                            <span className="text-brownSkincare">{item.product.length}</span>
                                        </div>
                                        <div className="flex justify-between md:space-x-3">
                                            <span>Presentasi chat</span>
                                            <span className="text-brownSkincare">100%</span>
                                        </div>
                                        <div className="flex justify-between md:space-x-3">
                                            <span>Waktu chat dibalas</span>
                                            <span className="text-brownSkincare">hitungan jam</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="mt-5 flex justify-end">
                            <nav aria-label="Page navigation example">
                                <ul className="inline-flex -space-x-px text-base h-10">
                                    {pagination.links && pagination.links.map((link, index) => (
                                        <li key={index}>
                                            <button
                                                disabled={!link.url}
                                                onClick={() => handlePageChange(link.url ? new URL(link.url).searchParams.get('page') : currentPage)}
                                                className={`flex items-center justify-center px-4 h-10 leading-tight ${link.active ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
                                            >
                                                {link.label.replace("&laquo;", "Previous").replace("&raquo;", "Next")}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </>

                )}
            </div>
        </>
    );
}