import React from 'react'
import PropTypes from 'prop-types'

export default function TlaPageHeader () {
    return (
        <>
            d
        </>
    )
}

TlaPageHeader.defaultProps = {
    title: 'Title',
    ext: null,
    onBack: null
}
TlaPageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    ext: PropTypes.node,
    onBack: PropTypes.string
}
