import { Footer } from "../../baseComponents/Footer";
import Navbar from "../../baseComponents/Navbar";
import Detail from "./contents/Detail";
import Hero from "./contents/Hero";


export function About() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar></Navbar>
                <main className="flex-grow">
                    <Hero></Hero>
                    <Detail></Detail>
                </main>
                <Footer></Footer>
            </div>
        </>

    )
}