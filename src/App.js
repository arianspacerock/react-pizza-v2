import React from "react";
import './App.css';
import './scss/app.scss';
import {Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./components/NotFoundBlock";

function App() {

    const [searhValue, setSearchValue] = React.useState('')

    return (
        <div className="wrapper">
            <Header searhValue={searhValue} setSearchValue={setSearchValue}/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
