import { LazyLoadImage } from "react-lazy-load-image-component";
import heroImage from "../../../../../public/skincare5.webp";
export default function Hero() {
    return (
        <div className="relative w-full">
            <div className="custom-w md:w-full">
                <LazyLoadImage
                    alt="hero"
                    src={heroImage}
                    effect="blur"
                    className="w-full h-[45vh] lg:h-[70vh] "
                    wrapperProps={{
                        style: { transitionDelay: "1s" },
                    }}
                >
                </LazyLoadImage>
            </div>
        </div>
    )

}