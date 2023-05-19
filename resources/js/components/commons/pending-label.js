import PropTypes from "prop-types";
import React from 'react'

const PendingItem = ({data, dataKey}) => {
    return (
        <p className={ 'text-error-700' }>{ data?.[dataKey] ? `(${ data?.[dataKey] })` : '' }</p>
    )
}

PendingItem.propTypes = {
    data: PropTypes.object,
    dataKey: PropTypes.string
}

export default PendingItem