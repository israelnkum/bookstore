import { Button, Form, Input, Popconfirm, Space, Table } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { useLocation, useOutletContext } from "react-router";
import { handleChangeLeaveRequestStatus, handleGetLeaveRequest } from "../../actions/time-off/TimeOffAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import { TlaError, TlaSuccess } from "../../utils/messages";
import FilterTimeOffs from "./filter-time-offs";
import LeaveStatus from "./leave-status";

const {Column} = Table

function AllTimeOffs(props) {
    const {setPageInfo, setExtra} = useOutletContext();
    const {getLeaveRequests, leaveRequests, filter, permissions, changeLeaveStatus} = props
    const {data, meta} = leaveRequests
    const [loading, setLoading] = useState(true)
    const {pathname} = useLocation()

    useEffect(() => {
        setPageInfo({title: 'Leave Requests'})
        getLeaveRequests(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [pathname])

    const bgColors = {
        'pending': 'bg-blue-500',
        'approved': 'bg-success-700',
        'rejected': 'bg-error-700',
    }

    const [form] = Form.useForm();

    const onFinish = (values) => {
        changeLeaveStatus(values).then(() => {
            TlaSuccess();
            form.resetFields();
        }).catch((error) => {
            TlaError(error.response.data.message)
        });
    };

    const ApproveOrDisapprove = ({id, action}) => (
        <Form form={ form } initialValues={ {leave_request_id: id, status: action} } onFinish={ onFinish }>
            <Form.Item hidden rules={ [{required: true}] } name={ 'leave_request_id' }>
                <Input/>
            </Form.Item>
            <Form.Item hidden rules={ [{required: true}] } name={ 'status' }>
                <Input/>
            </Form.Item>
            <Form.Item>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={ form.submit }
                    okText="Yes"
                    cancelText="No">
                    {
                        action === 'approved' &&
                        <Button htmlType={ 'submit' } size={ 'middle' } className={ 'btn-success' }>Approve</Button>
                    }
                    {
                        action === 'rejected' &&
                        <Button htmlType={ 'submit' } size={ 'middle' } className={ 'btn-primary' }>Reject</Button>
                    }
                </Popconfirm>

            </Form.Item>
        </Form>
    )

    ApproveOrDisapprove.propTypes = {
        id: PropTypes.any.isRequired,
        action: PropTypes.string.isRequired,
    }

    return (
        <div>
            <FilterTimeOffs/>
            <TlaTableWrapper
                formLoading={ loading }
                filterObj={ {} }
                callbackFunction={ getLeaveRequests }
                data={ data } meta={ meta }>
                <Column title="Leave Type" render={ (_, {leave_type}) => (
                    <Space direction={ 'vertical' }>
                        <p className={ 'leading-none' }>{ leave_type }</p>
                    </Space>
                ) }/>
                <Column title="Status" render={ (_, {hr_status, status}) => (
                    <LeaveStatus hrStatus={hr_status} supervisorStatus={status}/>
                ) }/>
                <Column title="Duration" render={ (_, {start_date, end_date, days_requested}) => (
                    <Space className={ 'leading-none' } direction={ 'vertical' }>
                        <p>From: { start_date }</p>
                        <p>To: { end_date }</p>
                        <p>Days: { days_requested }</p>
                    </Space>
                ) }/>
                <Column title="Approved By" render={ (_, {id, approver, status}) => (
                    <Space className={ 'leading-none' } direction={ 'vertical' }>
                        <p>{ approver }</p>
                        {
                            (status === 'pending' || status === 'rejected') &&
                            <Space>
                                {
                                    permissions.includes('approve-leave-request') &&
                                    <ApproveOrDisapprove id={ id } action={ 'approved' }/>
                                }
                                {
                                    permissions.includes('disapprove-leave-request') &&
                                    <ApproveOrDisapprove id={ id } action={ 'rejected' }/>
                                }
                            </Space>
                        }
                    </Space>
                ) }/>
            </TlaTableWrapper>
        </div>
    )
}

AllTimeOffs.propTypes = {
    getLeaveRequests: PropTypes.func,
    leaveRequests: PropTypes.object,
    filter: PropTypes.object,
    permissions: PropTypes.array.isRequired,
    changeLeaveStatus: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    leaveRequests: state.timeOffReducer.leaveRequests,
    filter: state.timeOffReducer.filter,
    permissions: state.userReducer.permissions
})

const mapDispatchToProps = (dispatch) => ({
    getLeaveRequests: (payload) => dispatch(handleGetLeaveRequest(payload)),
    changeLeaveStatus: (payload) => dispatch(handleChangeLeaveRequestStatus(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllTimeOffs)
