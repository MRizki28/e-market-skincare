import { Footer } from "../../baseComponents/Footer";
import Navbar from "../../baseComponents/Navbar";
import { ListDistributor } from "./contents/ListDistributor";


export function Distributor() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar></Navbar>
                <main className="flex-grow">
                   <ListDistributor></ListDistributor>
                </main>
                <Footer></Footer>
            </div>
        </>

    )
}