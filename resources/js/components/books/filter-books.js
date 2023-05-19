import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Row} from "antd";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {handleExportBooks, handleGetAllBooks} from "../../actions/book/BookAction";

function FilterBooks (props) {
    const { submitFilter, filter, exportFilter,} = props
    const initials = {
        ...filter,
        export: false
    }

    return (
        <FilterWrapper initialValue={initials} submitFilter={submitFilter} exportFilter={exportFilter}>
            {/*<div>
               <Form.Item name="date" label="Date">
                   <DatePicker.RangePicker />
               </Form.Item>
           </div>*/}
            <Row gutter={10}>

            </Row>
        </FilterWrapper>
    )
}

FilterBooks.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object
}

const mapStateToProps = (state) => ({
    filter: state.bookReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllBooks(params)),
    exportFilter: (params) => dispatch(handleExportBooks(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterBooks)
