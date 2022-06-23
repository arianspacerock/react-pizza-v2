import React from "react";
import './App.css';
import './scss/app.scss';
import {Routes, Route} from "react-router-dom";
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
                        <Route path="/" element={<Home/>}/>
                        <Route path="not-found" element={<NotFound/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
