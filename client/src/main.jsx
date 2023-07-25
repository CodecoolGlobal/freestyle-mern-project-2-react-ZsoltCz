import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/userContext.jsx";
import MessageContextProvider from "./context/messageContext.jsx";

//PAGES
// Main
// Login
// Registration
// Movies, sort, filter, search
// Movie
// Profile

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <MessageContextProvider>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
            </MessageContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
