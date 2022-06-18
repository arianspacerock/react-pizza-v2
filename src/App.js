import React from "react";
import './App.css';
import './scss/app.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./components/NotFoundBlock";

function App() {

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Home/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
