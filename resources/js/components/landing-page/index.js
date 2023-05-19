import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {handleGetAllBooks} from "../../actions/book/BookAction";
import {Link} from "react-router-dom";
import LandingHeader from "../landing-page/landing-header";
import BookImage from '../../assets/img/landing-head.jpg'
import {Button} from "antd";

function LandingPage(props) {
    const {getBooks, books, filter} = props
    const {data} = books
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getBooks(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <LandingHeader/>
            <div>
                <h3 className={'text-center text-4xl py-5'}>Best Seller Books</h3>
                <div className={'pb-10 flex flex-wrap gap-4 px-5 mx-auto w-[1146px]'}>
                    {
                        !loading && data.map((book) => (
                            <div key={book.id} className={'w-[250px] pb-2 border'}>
                                <Link style={{textDecoration: 'none'}} to={'book/detail'} state={{id: book.id}}>
                                    <div className={'relative'}>
                                        <p className={'absolute right-0 p-2 bg-dark text-white text-sm'}>{book.category}</p>
                                        <img className={'w-full'} src={BookImage} alt={book.title}/>
                                        <div className={'px-2'}>
                                            <h3 className={'text-lg'}>{book.title}</h3>
                                            <h3 className={'text-lg font-bold mb-3'}>₵{book.price}</h3>
                                            <h3 className={'text-md'}>{book.author}</h3>
                                        </div>
                                    </div>
                                </Link>
                                <div className={'px-2'}>
                                    <Button size={'large'} type={'primary'} className={'mt-2'} block>
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

LandingPage.propTypes = {
    getBooks: PropTypes.func,
    books: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    books: state.bookReducer.books,
    filter: state.bookReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getBooks: (payload) => dispatch(handleGetAllBooks(payload, "items"))
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
