import { Col, Row } from "antd";
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from "react-redux";
import { handleExportEmployees } from "../../actions/employee/EmployeeAction";
import { handleGetLeaveRequest } from "../../actions/time-off/TimeOffAction";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import TlaSelect from "../../commons/tla/TlaSelect";
import { statuses } from "../../utils";

function FilterTimeOffs (props) {
    const { submitFilter, filter, exportFilter} = props
    const initials = {
        ...filter,
        export: false
    }

    return (
       <FilterWrapper initialValue={initials} submitFilter={submitFilter} exportFilter={exportFilter}>
           <Row gutter={10}>
               <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                   <TlaSelect name={'status'} optionKey={'self'} options={statuses} label={'status'}/>
               </Col>
           </Row>
       </FilterWrapper>
    )
}

FilterTimeOffs.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    filter: state.timeOffReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetLeaveRequest(params)),
    exportFilter: (params) => dispatch(handleExportEmployees(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterTimeOffs)
