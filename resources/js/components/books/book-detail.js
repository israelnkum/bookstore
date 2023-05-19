import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {handleDeleteBook, handleGetSingleBook} from "../../actions/book/BookAction";
import {useOutletContext, useParams} from "react-router";
import PropTypes from "prop-types";
import {Card, Descriptions, Divider, Spin} from "antd";
import TlaConfirm from "../../commons/TlaConfirm";
import {TlaSuccess} from "../../utils/messages";
import TlaEdit from "../../commons/tla-edit";
import {useNavigate} from "react-router-dom";

function BookDetail({getBook, book, deleteBook}) {
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    const {setPageInfo} = useOutletContext();

    let pageData = {
        title: 'Book Detail', buttonText: 'Book'
    }
    const navigate = useNavigate()

    useEffect(() => {
        setPageInfo(pageData)

        getBook(id).then(() => {
            setLoading(false)
        })
    }, [])
    return (
        <Spin spinning={loading}>
            <div className={'flex justify-end gap-2'}>
                <TlaConfirm btnText={'Delete Book'} showIcon={false} danger type={'primary'} title={'Book'}
                            callBack={() => {
                                deleteBook(id).then(() => {
                                    TlaSuccess('Book Deleted')
                                    navigate('/books')
                                })
                            }}/>
                <TlaEdit type={'primary'} data={book} link={'/books/form'} text={'Edit Book'}/>
            </div>
            <Divider/>
            <div className={'flex gap-4 flex-wrap'}>
                <Descriptions title={'Detail'} column={1} size={'small'} bordered>
                    <Descriptions.Item label="Title">{book?.title}</Descriptions.Item>
                    <Descriptions.Item label="Category">{book?.category}</Descriptions.Item>
                    <Descriptions.Item label="Author">{book?.author}</Descriptions.Item>
                    <Descriptions.Item label="isbn">{book?.isbn}</Descriptions.Item>
                    <Descriptions.Item label="price">{book?.price}</Descriptions.Item>
                    <Descriptions.Item label="description">{book?.description}</Descriptions.Item>
                </Descriptions>
                <Descriptions title={'Book Type'} column={1} size={'small'} bordered>
                    <Descriptions.Item label="Type">{book?.book_type}</Descriptions.Item>
                    {
                        book?.book_type === 'Ebook' ?
                            <>
                                <Descriptions.Item label="File Size (MB)">{book?.bookable?.size}</Descriptions.Item>
                                <Descriptions.Item label="Download URL">
                                    <a href={book?.bookable?.download_url} download={true}>Download</a>
                                </Descriptions.Item>
                            </> :
                            <>
                                <Descriptions.Item
                                    label="shipping weight">{book?.bookable?.shipping_weight}</Descriptions.Item>
                                <Descriptions.Item
                                    label="In Stock">{book?.bookable?.in_stock ? 'In Stock' : 'Out of Stock'}</Descriptions.Item>
                            </>
                    }

                </Descriptions>
                <Card size={'small'} title={'Image'}>
                    <img src={book.photo} alt={book.title} className={'w-[300px]'}/>
                </Card>
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
    getBook: (id) => dispatch(handleGetSingleBook(id)),
    deleteBook: (id) => dispatch(handleDeleteBook(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)
