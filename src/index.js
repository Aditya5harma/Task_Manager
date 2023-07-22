import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/reducer";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";


const store = configureStore({
    reducer:rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>       
                <App />
                <Toaster/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
   
);
