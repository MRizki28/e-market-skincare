import { LazyLoadImage } from "react-lazy-load-image-component";
import image1 from "../../../../../public/skincare6.webp";

export default function Detail() {
    return (
        <>
            <div className="mt-4 space-y-4">
                <div className="text-[#debd8a] font-bold text-5xl">
                    <h1 className="text-center">Tentang Kami</h1>
                </div>
                <div className="text-center ">
                    <span className="text-center ">Cari tahu mengenai perusahaan penyedia informasi distributor terbsesar di sulawesi tengah</span>
                </div>
                <div className="flex justify-center">
                    <div className="border-b-2 border-[#debd8a] w-1/2"></div>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto p-3 mt-14">
                <div>
                    <div>
                        <h1 className="text-left font-basicCommersialRegular text-2xl">Tujuan Kami</h1>
                    </div>
                    <div className="mt-4">
                        <p>Bagaimana kebutuhan skincare di kota palu sangat pesat sehingga timbul lah sebuah permasalahan yaitu susahnya mencari informasi produk - produk yang cocok dan berkualitas, maka dari itu saya membangun market ini untuk memudahkan masyarakan dalam mencari produk melalui distributor langsung</p>
                    </div>
                    <div className="w-full mt-4 md:w-1/2">
                        <LazyLoadImage
                            alt="product"
                            src={image1}
                            className="max-w-full h-60 object-cover "
                            width="388"
                            height="240"
                            effect="blur"
                            wrapperProps={{
                                style: { transitionDelay: "1s" },
                            }}
                        >

                        </LazyLoadImage>
                    </div>
                </div>
                <div className="mt-5">
                    <div>
                        <h1 className="text-left font-basicCommersialRegular text-2xl">Ambisi Kami</h1>
                    </div>
                    <div className="mt-4">
                        <p>Kami telah menetapkan tiga ambisi besar yang menjadi acuan seluruh upaya dalam mencapai komitmen kedepannya dan mendukung tercapainya tujuan bersama untuk memajukan dunia industri khususnya dalam bidang kecantikan</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 mt-3 md:grid md:grid-cols-3">
                        <div className="rounded-lg bg-[#f4e1d2] h-64 p-8 flex flex-col space-y-3">
                            <div className="text-lg font-bold">
                                <span>Membantu</span>
                            </div>
                            <div className="text-2xl font-bold">
                                <span>10+ Distributor</span>
                            </div>
                            <div className="text-lg font-bold">
                                <span>Di kota palu</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-[#e6d4f0] h-64 p-8 flex flex-col space-y-3">
                            <div className="text-lg font-bold">
                                <span>Membantu memasarkan produk skincare</span>
                            </div>
                            <div className="text-2xl font-bold">
                                <span>100+ Produk</span>
                            </div>
                            <div className="text-lg font-bold">
                                <span>Untuk seluruh masyarakat kota palu</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-[#d4f5e6] h-64 p-8 flex flex-col space-y-3">
                            <div className="text-lg font-bold">
                                <span>Menjadi platform yang dapat bersaing dengan e-commers besar</span>
                            </div>
                            <div className="text-2xl font-bold">
                                <span>2026</span>
                            </div>
                            <div className="text-lg font-bold">
                                <span>Big dream</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}