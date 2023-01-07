import React from "react";
import qs from "qs"
import {useSelector, } from "react-redux";
import {useNavigate} from "react-router-dom";

import Categories from "../components/Categories";
import Sort, {sortlist} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import  {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas, SearchPizzaParams, selectPizzaData} from "../redux/slices/pizzaSlice";
import {useAppDispatch} from "../redux/store";


const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isMounted = React.useRef(false)

    const {items, status} = useSelector(selectPizzaData)
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)

    const isSearch = React.useRef(false)

    const onChangeCategory = (idx: number) => {
        dispatch(setCategoryId(idx))
    }

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage,
            }),
        )
        window.scrollTo(0, 0)
    }

// Если изменили параметры и был первый рендер
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.Property,
                categoryId,
                currentPage,
            })

            navigate(`?${queryString}`)
        }
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

// Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
    React.useEffect(() => {
        if (window.location.search) {
            const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams

            const sort = sortlist.find(obj => obj.sortProperty === params.sortBy)

            dispatch(setFilters({
                searchValue: params.search,
                categoryId: Number(params.category),
                pageCount: Number(params.currentPage),
                sort: sort || sortlist[0],
            }))
            isSearch.current = true
        }
    }, [])

// Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage])


    const pizzas = items.map((obj: any) => <PizzaBlock  {...obj} />

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChangeCategory={onChangeCategory}
                />
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка <span>😕</span></h2>
                    <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
               <div className="content__items"> {status === 'loading' ? skeletons : pizzas} </div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home
