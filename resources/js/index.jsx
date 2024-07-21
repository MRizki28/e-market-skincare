import { BrowserRouter } from "react-router-dom";
import App from "./app";
import ReactDOM from "react-dom/client";
import '../css/app.css';
import './bootstrap';

const root = ReactDOM.createRoot(document.getElementById('frontend-app'));

root.render(
    <BrowserRouter>
        <App></App>
    </BrowserRouter>
)