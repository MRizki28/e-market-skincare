import React from "react";
import HeroImage from "../../../../../public/heroSkincare.webp";
import HeroImage2 from "../../../../../public/heroSkincare2.webp";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Hero() {
    const settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <div className="relative w-full">
            <Slider {...settings}>
                <div className="custom-w md:w-full">
                    <LazyLoadImage
                        alt="hero"
                        src={HeroImage}
                        effect="blur"
                        className="w-full h-[45vh] lg:h-[70vh] "
                        wrapperProps={{
                            style: { transitionDelay: "1s" },
                        }}
                    />
                </div>
                <div className="custom-w md:w-full">
                    <LazyLoadImage
                        alt="hero"
                        src={HeroImage2}
                        effect="blur"
                        className="w-full h-[45vh] lg:h-[70vh] "
                        wrapperProps={{
                            style: { transitionDelay: "1s" },
                        }}
                    />
                </div>
            </Slider>
        </div>
    );
}
