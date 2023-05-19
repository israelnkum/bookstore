import {Col, Form, Input, Row, Radio, InputNumber} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleAddBook, handleUpdateBook} from "../../actions/book/BookAction";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import TlaSelect from "../../commons/tla/TlaSelect";
import ChangePicture from "../commons/change-picture";

function BookForm(props) {
    const [selectedFile, setSelectedFile] = useState(null)
    const {addBook, updateBook, categories, authors} = props
    const [bookType, setBookType] = useState('Ebook');

    const {state} = useLocation()

    let formValues = {
        id: 0,
        book_type: bookType,
        ...state?.data?.bookable,
        ...state?.data,
    }

    const onChange = (e) => {
        setBookType(e.target.value);
    };

    useEffect(() => {
        setBookType(state?.data?.book_type ?? 'Ebook')
    }, [state?.data])

    return (
        <TlaFormWrapper
            width={720}
            file={selectedFile}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addBook : updateBook}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Book`}>
            <Row gutter={10}>
                <Col span={6}>
                    <ChangePicture hasFile={selectedFile === null} setFile={setSelectedFile}/>
                </Col>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={18}>
                            <Form.Item name="title" label="Book Title"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Title is Required'
                                           }
                                       ]}>
                                <Input size={'large'}/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="isbn" label="ISBN"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'ISBN is Required'
                                           }
                                       ]}>
                                <Input size={'large'}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <TlaSelect
                                name={'author_id'}
                                label={'Author'}
                                required optionKey={'name'}
                                options={authors}/>
                        </Col>
                        <Col span={12}>
                            <TlaSelect
                                name={'category_id'}
                                label={'Category'}
                                required optionKey={'name'}
                                options={categories}/>
                        </Col>
                        <Col>
                            <Form.Item hidden name="id" label="ID"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Required'
                                           }
                                       ]}>
                                <Input size={'large'}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="book_type" label="Book Type"
                        rules={[
                            {
                                required: true,
                                message: 'Book Type is Required'
                            }
                        ]}>
                        <Radio.Group onChange={onChange} value={bookType}>
                            <Radio value={'Ebook'}>E-Book</Radio>
                            <Radio value={'PaperBook'}>Paper Book</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[
                            {
                                required: true,
                                message: 'Price is Required'
                            }
                        ]}>
                        <InputNumber min={0} step={0.1} size={'large'} style={{width: '100%'}}/>
                    </Form.Item>
                </Col>
                {
                    bookType === 'Ebook' &&
                    <>
                        <Col span={12}>
                            <Form.Item name="size" label="File Size (MB)"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'File Size is Required'
                                           }
                                       ]}>
                                <InputNumber step={0.1} min={1} size={'large'} style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="download_url" label="Download URL"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Download URL is Required'
                                           }
                                       ]}>
                                <Input size={'large'}/>
                            </Form.Item>
                        </Col>
                    </>
                }

                {
                    bookType === 'PaperBook' &&
                    <>
                        <Col span={12}>
                            <Form.Item name="shipping_weight" label="Shipping Weight"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Shipping Weight'
                                           }
                                       ]}>
                                <InputNumber min={1} step={0.1} size={'large'} style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="in_stock" label="Status"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Status is Required'
                                           }
                                       ]}>
                                <Radio.Group>
                                    <Radio value={1}>In-Stock</Radio>
                                    <Radio value={0}>Out of Stock</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </>
                }
                <Col span={24}>
                    <Form.Item name="description" label="description">
                        <Input.TextArea/>
                    </Form.Item>
                </Col>
            </Row>
        </TlaFormWrapper>
    )
}

BookForm.propTypes = {
    addBook: PropTypes.func.isRequired,
    updateBook: PropTypes.func.isRequired,
    authors: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    authors: state.commonReducer.commons.authors,
    categories: state.commonReducer.commons.categories
});

const mapDispatchToProps = (dispatch) => ({
    addBook: (payload) => dispatch(handleAddBook(payload)),
    updateBook: (payload) => dispatch(handleUpdateBook(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookForm)
