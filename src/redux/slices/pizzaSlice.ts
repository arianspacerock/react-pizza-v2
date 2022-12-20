import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";


type Pizza = {
    id: string,
    types: number[],
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
}

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface PizzaSliceState {
    items: Pizza[];
    status: Status
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, // loading | success | error
}

export const fetchPizzas = createAsyncThunk< Pizza[], Record<string, string> >('pizza/fetchPizzasStatus', async (params) => {
        const {sortBy, order, category, search, currentPage} = params
        const {data} = await axios.get<Pizza[]>(
            `https://629f7aa2461f8173e4ea8987.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        return data
    }
)

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR
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




