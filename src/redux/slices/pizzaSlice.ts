import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";
import {CartItem} from "./cartSlice";


export const fetchPizzas = createAsyncThunk< CartItem[], Record<string, string> >('pizza/fetchPizzasStatus', async (params) => {
    const {sortBy, order, category, search, currentPage} = params
    const {data} = await axios.get<CartItem[]>(
        `https://629f7aa2461f8173e4ea8987.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
        return data
    }
)

type Pizza = {
    id: string,
    types: number[],
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
}

interface PizzaSliceState {
    items: Pizza[];
    status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading', // loading | success | error
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = 'loading'
            state.items = []
        })
    }
    //extraReducers: {
        //[fetchPizzas.pending]: (state) => {
        //    state.status = 'loading'
        //    state.items = []
        //},
       // [fetchPizzas.fulfilled]: (state, action) => {
        //    state.items = action.payload
        //    state.status = 'success'
       // },
        //[fetchPizzas.rejected]: (state, action) => {
         //   state.status = 'error'
        //    state.items = []
       // },
    //},
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer




