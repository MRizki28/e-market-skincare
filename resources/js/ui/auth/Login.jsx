import { Footer } from "../../baseComponents/Footer";
import Navbar from "../../baseComponents/Navbar";
import { LoginForm } from "./contents/LoginForm";

export function Login() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <LoginForm></LoginForm>
            </main>
            <Footer />
        </div>
    )
}