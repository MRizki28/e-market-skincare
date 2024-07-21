import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ReactDOM from "react-dom/client";
import '../css/app.css';
import './bootstrap';
import 'flowbite'

const root = ReactDOM.createRoot(document.getElementById('frontend-app'));

root.render(
    <BrowserRouter>
        <App></App>
    </BrowserRouter>
)