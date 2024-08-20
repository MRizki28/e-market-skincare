import { Footer } from "../../baseComponents/Footer";
import Navbar from "../../baseComponents/Navbar";
import { HistoryPayment } from "./contents/HistoryPayment";

export function History() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <HistoryPayment></HistoryPayment>
            </main>
            <Footer />
        </div>
    )
}