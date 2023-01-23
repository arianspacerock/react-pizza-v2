import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Pizza, SearchPizzaParams} from "./types";

export const fetchPizzas = createAsyncThunk< Pizza[], SearchPizzaParams >('pizza/fetchPizzasStatus', async (params) => {
        const {sortBy, order, category, search, currentPage} = params
        const {data} = await axios.get<Pizza[]>(
            `https://629f7aa2461f8173e4ea8987.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        return data
    }
)