import { Footer } from "../../baseComponents/Footer";
import Navbar from "../../baseComponents/Navbar";
import { RegisterForm } from "./contents/RegisterForm";


export function Register() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <RegisterForm></RegisterForm>
            </main>
            <Footer />
        </div>
    )
}