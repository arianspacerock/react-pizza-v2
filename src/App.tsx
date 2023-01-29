import './App.css';
import './scss/app.scss';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./components/NotFoundBlock";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";
import React, {Suspense} from "react"

const Cart = React.lazy(() => import('./pages/Cart'))

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="" element={<Home/>}/>
                <Route path="cart" element={
                    <Suspense fallback={<div>Идет загрузка корзины...</div>}>
                        <Cart/>
                    </Suspense>}/>
                <Route path="pizza/:id" element={
                    <Suspense fallback={<div>Идет загрузка...</div>}>
                        <FullPizza/>
                    </Suspense>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    )
}

export default App;
