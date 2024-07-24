import { Footer } from "../../baseComponents/Footer";
import Navbar from "../../baseComponents/Navbar";
import BestProduct from "./contents/BestProduct";
import Hero from "./contents/Hero";

export function Home() {
    return (
        <>
            <Navbar></Navbar>
            <Hero></Hero>
            <BestProduct></BestProduct>
            <Footer></Footer>
        </> 
    )
}