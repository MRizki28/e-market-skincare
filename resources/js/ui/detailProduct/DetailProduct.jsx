import { Footer } from "../../baseComponents/Footer";
import Navbar from "../../baseComponents/Navbar";
import { Detail } from "./contents/Detail";

export function DetailProduct() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar></Navbar>
                <main className="flex-grow">
                    <Detail></Detail>
                </main>
                <Footer></Footer>
            </div>
        </>

    )
}