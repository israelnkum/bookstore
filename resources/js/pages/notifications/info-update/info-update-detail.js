import { Button, Col, Form, Input, Row, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { handleGetInformationUpdate } from "../../../actions/information-updates/Actions";
import { handleApproveLeaveRequest } from "../../../actions/leave-management/leave-requests/Actions";
import { handleChangeLeaveRequestStatus } from "../../../actions/time-off/TimeOffAction";
import ValidateComponent from "../../../commons/validate-component";
import { capitalize } from "../../../utils";
import { TlaError, TlaSuccess } from "../../../utils/messages";

function InfoUpdateDetail({getInformationUpdate, changeHrLeaveStatus, changeLeaveStatus, informationUpdate}) {
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const {state} = useLocation()

    const [form] = Form.useForm();

    const navigate = useNavigate();

    useEffect(() => {
        getInformationUpdate(state.id).then(() => setLoading(false))
    }, [])

    const formValues = {
        id: 0,
        ...informationUpdate
    };

    const onFinish = (values) => {
        setUpdating(true);
        (informationUpdate?.status === 'approved' ? changeHrLeaveStatus(values) :
            changeLeaveStatus({
                ...values,
                status: values.hr_status_update,
                sup_reason: values.hr_reason
            })).then(() => {
            setUpdating(false)
            navigate('/notifications/leave-request')
            TlaSuccess()
        }).catch(() => TlaError())
    };


    const ApprovalForm = () => (
        <React.Fragment>
            <div className={ 'mt-2' }>
                <Row gutter={ 10 }>
                    <Col span={ 12 }>
                        <Form.Item
                            hidden
                            rules={ [{required: true}] }
                            name={ 'id' } label={ 'ID' }>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item name={ 'hr_reason' } label={ 'Reason' }>
                            <Input.TextArea rows={ 3 }/>
                        </Form.Item>
                    </Col>
                </Row>
            </div>
            <div className={ 'flex flex-col items-start gap-2' }>
                <ValidateComponent permissions={ ['move-leave'] }>
                    <Button
                        size={ 'large' }
                        className={ 'btn-primary' }
                        block
                        htmlType={ 'submit' }>Move for Approval</Button>
                </ValidateComponent>
            </div>
        </React.Fragment>
    )

    return (
        <div className={ 'w-full' }>
            <div className={ 'mx-auto' }>
                <Spin spinning={ loading || updating }>
                    {
                        !loading &&
                        <Form onFinish={ onFinish } layout="vertical" initialValues={ formValues } form={ form }>
                            <div className={ 'shadow-lg bg-white' }>
                                <div className={ 'bg-dark p-3 flex justify-between' }>
                                    <p className={ 'text-white' }>
                                        Change in Information Request
                                    </p>
                                    <div className={ 'flex' }>
                                        <Button className={ '!bg-white' }>Approve</Button>
                                        <Button className={ '' }>
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                                <div className={ 'p-3 w-fit gap-3 mx-auto' }>
                                    <div className={'flex justify-between'}>
                                        <div>Type</div>
                                        <div>Old Info</div>
                                        <div>New Info</div>
                                    </div>
                                    {
                                        Object.keys(informationUpdate.old_info).map((item, index) => (
                                            <div key={ index } className={ 'flex justify-between' }>
                                                <div>
                                                    { item }
                                                </div>
                                                <div>
                                                    { informationUpdate.old_info[item] ? informationUpdate.old_info[item] : '-' }
                                                </div>
                                                <div>
                                                    { informationUpdate.new_info[item] ? informationUpdate.new_info[item] : '-' }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </Form>
                    }
                </Spin>
            </div>
        </div>
    )
}

InfoUpdateDetail.propTypes = {
    getInformationUpdate: PropTypes.func.isRequired,
    changeLeaveStatus: PropTypes.func.isRequired,
    changeHrLeaveStatus: PropTypes.func.isRequired,
    informationUpdate: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    informationUpdate: state.informationUpdateReducer.informationUpdate
})

const mapDispatchToProps = (dispatch) => ({
    getInformationUpdate: (id) => dispatch(handleGetInformationUpdate(id)),
    changeHrLeaveStatus: (data) => dispatch(handleApproveLeaveRequest(data)),
    changeLeaveStatus: (payload) => dispatch(handleChangeLeaveRequestStatus(payload, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoUpdateDetail)