import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
}

export type Sort = {
    name: string;
    sortProperty: SortPropertyEnum;
}

export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    pageCount: number;
    sort: Sort;
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    pageCount: 1,
    sort:  {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING_DESC,
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.pageCount = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.sort = action.payload.sort
            state.pageCount = Number(action.payload.pageCount)
            state.categoryId = Number(action.payload.categoryId)
        }
    }
})

export const selectFilter = (state: RootState) => state.filter
export const selectSort = (state: RootState) => state.filter.sort

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer




