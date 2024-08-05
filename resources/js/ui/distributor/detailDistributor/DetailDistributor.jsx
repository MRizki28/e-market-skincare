import { Footer } from "../../../baseComponents/Footer";
import Navbar from "../../../baseComponents/Navbar";
import { ListDetailDistributor } from "./contents/ListDetailDistributor";



export function DetailDistributor() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar></Navbar>
                <main className="flex-grow">
                    <ListDetailDistributor></ListDetailDistributor>
                </main>
                <Footer></Footer>
            </div>
        </>

    )
}