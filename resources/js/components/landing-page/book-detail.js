import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {handleGetSingleBook} from "../../actions/book/BookAction";
import PropTypes from "prop-types";
import {Button, Spin} from "antd";
import {useLocation} from "react-router";
import Img from '../../assets/img/landing-head.jpg'
import LoginRegister from "./login-register";

function BookDetail({getBook, book}) {
    const [loading, setLoading] = useState(true)

    const {state} = useLocation()

    const id = state?.id
    useEffect(() => {
        getBook(id).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={loading}>
            <div className={'py-5 pl-[170px] flex justify-between pr-[150px]'}>
                <LoginRegister/>
                <a href="/landing" className={'auth-btn'}>Shop</a>
            </div>
            <div className={'flex justify-center gap-4 flex-wrap'}>
                <div className={'w-[500px]'}>
                    <img src={Img} alt={book.title}/>
                </div>
                <div className={'w-[500px]'}>
                    <p className={'p-2 bg-dark text-white text-sm w-fit'}>{book.category}</p>
                    <h1 className={'text-3xl'}>{book.title}</h1>
                    <h1 className={'text-3xl'}>₵{book.price}</h1>
                    <h1 className={'text-2xl'}>₵{book.isbn}</h1>
                    <p className={'text-sm'}>{book.description}</p>

                    <div>
                        <Button size={'large'} type={'primary'} className={'mt-2'}>
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </Spin>
    )
}

BookDetail.propTypes = {
    getBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    deleteBook: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    book: state.bookReducer.book
})

const mapDispatchToProps = (dispatch) => ({
    getBook: (id) => dispatch(handleGetSingleBook(id, 'items')),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)
