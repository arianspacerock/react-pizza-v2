import React from "react";
import {useParams} from "react-router-dom";

const FullPizza = () => {
    const { id } = useParams()

    return (
        <div className="container">
            <img src="" alt=""/>
            <h2>{id}</h2>
            <p>CATS</p>
            <h4>250 ₽</h4>
        </div>
    )
}

export default FullPizza