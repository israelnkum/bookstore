import { Space, Table } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { useOutletContext } from 'react-router'
import {
    handleDeleteLeaveType,
    handleGetAllLeaveRequest
} from "../../../actions/leave-management/leave-types/leave-management-action";
import TlaTableWrapper from "../../../commons/table/tla-table-wrapper";
import TlaEdit from "../../../commons/tla-edit";
import TlaConfirm from "../../../commons/TlaConfirm";
import ViewAllWrapper from "../../../commons/view-all-wrapper";
import { TlaSuccess } from "../../../utils/messages";

const {Column} = Table

function LeaveTypes(props) {
    const {getLeaveTypes, leaveTypes, filter, deleteLeaveType} = props
    const {data, meta} = leaveTypes
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Leave Types', addLink: '/leave-management/leave-types/form', buttonText: 'Leave Type'})

        getLeaveTypes(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    /*allow_carry_forward
        :
        0
    allow_half_day
        :
        1
    created_at
        :
        "2023-03-03T10:26:41.000000Z"
    deleted_at
        :
        null
    description
        :
        null
    entitlement_type
        :
        "custom"
    id
        :
        1
    maximum_allotment
        :
        0
    maximum_consecutive_days
        :
        0
    name
        :
        "Annual Leave"
    number_of_days
        :
        0
    should_request_before
        :
        1
    start_of_annual_cycle
        :
        "2023-01-01"
    updated_at
        :
        "2023-03-03T10:26:41.000000Z"
    user_id
        :
        1*/
    return (
        <ViewAllWrapper loading={ loading } noData={ data.length === 0 }>
            <TlaTableWrapper filterObj={ filter } callbackFunction={ getLeaveTypes } data={ data } meta={ meta }>
                <Column title={ 'Name' } dataIndex={ 'name' }/>
                <Column title={ 'Action' } render={ (_, record) => (
                    <Space>
                        <TlaEdit icon data={ record } link={ 'form' } type={ 'text' }/>
                        <TlaConfirm title={ 'Dependant' } callBack={
                            () => {
                                deleteLeaveType(record.id)
                                    .then(() => TlaSuccess('Record Deleted'))
                            }
                        }/>
                    </Space>
                ) }/>
            </TlaTableWrapper>
        </ViewAllWrapper>
    )
}

LeaveTypes.propTypes = {
    pageInfo: PropTypes.object,
    getLeaveTypes: PropTypes.func,
    deleteLeaveType: PropTypes.func,
    leaveTypes: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    leaveTypes: state.leaveTypesReducer.leaveTypes,
    filter: state.leaveTypesReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getLeaveTypes: (data) => dispatch(handleGetAllLeaveRequest(data)),
    deleteLeaveType: (id) => dispatch(handleDeleteLeaveType(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(LeaveTypes)
