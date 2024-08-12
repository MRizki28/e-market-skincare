import { Footer } from "../../baseComponents/Footer";
import Navbar from "../../baseComponents/Navbar";
import { ListProduct } from "./contents/ListProduct";


export function ProductAll() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <ListProduct />
            </main>
            <Footer />
        </div>
    );
}
