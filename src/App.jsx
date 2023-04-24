import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Items from "./pages/Items";
import Login from "./pages/Login";
import { useState } from "react";
import Order from "./pages/Order";
import Store from "./pages/Store";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import "./App.css"
export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Layout />} >
                    <Route index path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/items/:id" element={<Items />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="*" element={<NoPage />} />\
                </Route>
            </Routes>
        </BrowserRouter >
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);