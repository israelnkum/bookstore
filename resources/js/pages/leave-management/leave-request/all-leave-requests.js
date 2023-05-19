import { Button, Form, Input, Popconfirm, Space, Table } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { useLocation, useOutletContext } from "react-router";
import { Link } from "react-router-dom";
import { handleGetAllLeaveRequest } from "../../../actions/leave-management/leave-requests/Actions";
import TlaTableWrapper from "../../../commons/table/tla-table-wrapper";
import TlaImage from "../../../commons/tla-image";
import LeaveStatus from "../../../components/time-off/leave-status";
import FilterLeaveRequests from "./filter-leave-requests";


const {Column} = Table

function AllLeaveRequests(props) {
    const {setPageInfo, setExtra} = useOutletContext();
    const {getLeaveRequests, leaveRequests, permissions, filter} = props
    const {data, meta} = leaveRequests
    const [loading, setLoading] = useState(true)
    const {pathname} = useLocation()

    useEffect(() => {
        setPageInfo({title: 'Leave Request'})
        getLeaveRequests(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [pathname])

    const bgColors = {
        'pending': 'bg-blue-500',
        'approved': 'bg-success-700'
    }

    const [form] = Form.useForm();

    const onFinish = () => {

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
                    title="Reject request"
                    description="Are you sure you want to reject?"
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

    // eslint-disable-next-line react/prop-types
    const Item = ({title, value}) => (
        <p className={ 'flex justify-between' }><span>{ title }:</span> <span>{ value }</span></p>
    )

    return (
        <div>
            <FilterLeaveRequests/>
            <TlaTableWrapper
                formLoading={ loading }
                filterObj={ {} }
                callbackFunction={ getLeaveRequests }
                data={ data } meta={ meta }>
                <Column title="Leave Type" render={ (_, {id, leave_type, status}) => (
                    <Link to={ `/notifications/leave-request/${ id }/details` } state={ {id: id} }>
                        <Space direction={ 'vertical' }>
                            <p className={ 'leading-none' }>{ leave_type }</p>
                            <div
                                className={ `${ bgColors[status] } text-white py-px px-1 rounded-lg capitalize w-fit` }>
                                { status }
                            </div>
                        </Space>
                    </Link>
                ) }/>
                <Column title="Status" render={ (_, {hr_status, status}) => (
                    <LeaveStatus hrStatus={hr_status} supervisorStatus={status}/>
                ) }/>
                <Column title="Employee" render={ (_, {employee, department}) => (
                    <Space className={ 'leading-none' }>
                        <div>
                            <TlaImage name={ employee } src={ 'Avatar' } size={ 45 }/>
                        </div>
                        <Space className={ 'leading-none' } direction={ 'vertical' }>
                            <p>{ employee }</p>
                            <p>{ department }</p>
                        </Space>
                    </Space>
                ) }/>
                <Column title="Duration" render={ (_, {startDate, endDate}) => (
                    <>
                        <Space className={ 'leading-none w-full' } direction={ 'vertical' }>
                            <Item title={ 'From' } value={ startDate }/>
                            <Item title={ 'To' } value={ endDate }/>
                        </Space>
                    </>
                ) }/>
                <Column title="Days" render={ (_, {days_approved, days_requested}) => (
                    <>
                        <Space className={ 'leading-none w-full' } direction={ 'vertical' }>
                            <Item title={ 'Requested' } value={ days_requested }/>
                            <Item title={ 'Approved' } value={ days_approved }/>
                        </Space>
                    </>
                ) }/>
                <Column title="Approver" render={ (_, {id, approver, status, approved_hr}) => (
                    <>
                        <Space className={ 'leading-none' } direction={ 'vertical' }>
                            <p>Sup: { approver }</p>
                            <p>HR: { approved_hr }</p>
                            {
                                (status === 'pending' || status === 'rejected') &&
                                <Space>
                                    {
                                        permissions.includes('approve-leave') &&
                                        <ApproveOrDisapprove id={ id } action={ 'approved' }/>
                                    }
                                    {
                                        permissions.includes('disapprove-leave') &&
                                        <ApproveOrDisapprove id={ id } action={ 'rejected' }/>
                                    }
                                </Space>
                            }
                        </Space>
                    </>
                ) }/>
            </TlaTableWrapper>
        </div>
    )
}

AllLeaveRequests.propTypes = {
    getLeaveRequests: PropTypes.func,
    leaveRequests: PropTypes.object,
    filter: PropTypes.object,
    permissions: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    leaveRequests: state.leaveManagementReducer.leaveRequests,
    filter: state.leaveManagementReducer.filter,
    permissions: state.userReducer.permissions
})

const mapDispatchToProps = (dispatch) => ({
    getLeaveRequests: (payload) => dispatch(handleGetAllLeaveRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllLeaveRequests)
