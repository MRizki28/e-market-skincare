import React from "react";
import HeroImage from "../../../../../public/heroSkincare.webp"
import HeroImage2 from "../../../../../public/heroSkincare2.webp"
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Hero() {
    const settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    }

    return (
        <div className="">
            <Slider {...settings}>
                <div className="custom-w">
                    <LazyLoadImage
                        alt="hero"
                        src={HeroImage}
                        effect="blur"
                        className="object-cover w-full"
                        wrapperProps={{
                            style: {transitionDelay: "1s"},
                        }}>
                        
                    </LazyLoadImage>
                </div>
                <div className="custom-w">
                <LazyLoadImage
                        alt="hero"
                        src={HeroImage2}
                        effect="blur"
                        className="object-cover w-full"
                        wrapperProps={{
                            style: {transitionDelay: "1s"},
                        }}>
                    </LazyLoadImage>
                </div>
            </Slider>
        </div>
    )
}