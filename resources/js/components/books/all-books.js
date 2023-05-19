import {Table} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useOutletContext} from 'react-router'
import {handleGetAllBooks} from "../../actions/book/BookAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useNavigate} from "react-router-dom";

const {Column} = Table


function AllBooks(props) {
    const {getBooks, books, filter} = props
    const {data, meta} = books
    const [loading, setLoading] = useState(true)
    const {setPageInfo, setExtra} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Books', addLink: '/books/form', buttonText: 'Book'})

        getBooks(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    const navigate = useNavigate()
    const Details = ({id}) => {
        return {
            onClick: () => {
                navigate(`/books/${id}/details`)
            },
        };
    }

    return (
        <div className={ 'pb-10' }>
            {/*<FilterBooks/>*/}
            <TlaTableWrapper
                formLoading={ loading }
                filterObj={ filter }
                callbackFunction={ getBooks }
                data={ data } meta={ meta }>
                <Column className={'cursor-pointer'} onCell={Details} title="title" dataIndex={ 'title' }/>
                <Column className={'cursor-pointer'} onCell={Details} title="book type" dataIndex={ 'book_type' }/>
                <Column className={'cursor-pointer'} onCell={Details} title="category" dataIndex={ 'category' }/>
                <Column className={'cursor-pointer'} onCell={Details} title="author" dataIndex={ 'author' }/>
                <Column className={'cursor-pointer'} onCell={Details} title="isbn" dataIndex={ 'isbn' }/>
            </TlaTableWrapper>
        </div>
    )
}

AllBooks.propTypes = {
    pageInfo: PropTypes.object,
    getBooks: PropTypes.func,
    books: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    books: state.bookReducer.books,
    filter: state.bookReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getBooks: (payload) => dispatch(handleGetAllBooks(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks)
