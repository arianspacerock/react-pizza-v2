import React from "react";
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'

const Pagination = () => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={obj => console.log(obj)}
            pageRangeDisplayed={5}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination