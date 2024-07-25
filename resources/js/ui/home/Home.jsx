import { Footer } from "../../baseComponents/Footer";
import Navbar from "../../baseComponents/Navbar";
import BestProduct from "./contents/BestProduct";
import Hero from "./contents/Hero";

export function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Hero />
                <BestProduct />
            </main>
            <Footer />
        </div>
    );
}
