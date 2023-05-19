import { Space } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { statusColors } from "../../utils";

function LeaveStatus({hrStatus, supervisorStatus}) {

    // eslint-disable-next-line react/prop-types
    const Item = ({title, status}) => (
        <div className={ 'flex justify-between gap-3' }>
            <span>{ title }</span>
            <span className={ `bg-${ statusColors[status] } text-white py-px px-1 rounded-lg capitalize w-fit` }>
                    { status }
                </span>
        </div>
    )

    return (
        <Space direction={ 'vertical' }>
            <Item title={ 'Supervisor' } status={ supervisorStatus }/>
            <Item title={ 'HR' } status={ hrStatus }/>
        </Space>
    )
}

LeaveStatus.propTypes = {
    hrStatus: PropTypes.string,
    supervisorStatus: PropTypes.string
}

export default LeaveStatus
