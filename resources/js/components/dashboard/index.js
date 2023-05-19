import PropTypes from "prop-types";
import React from 'react'
import {connect} from "react-redux";
import {Card} from "antd";

function Dashboard({commons, activeRole}) {
    // eslint-disable-next-line react/prop-types
    const DashItem = ({title, count}) => (
        <Card title={title} className={'min-w-[200px]'} size={'small'}>
            <h3 className={'text-3xl'}>{count}</h3>
        </Card>
    )
    return (
        <div className={'mt-1.5 flex flex-wrap gap-3'}>
            {
                activeRole === 'admin' &&
                <>
                    <DashItem title={'Categories'} count={commons?.categories?.length}/>
                    <DashItem title={'Authors'} count={commons?.authors?.length}/>
                    <DashItem title={'Books'} count={commons?.books}/>
                </>
            }
        </div>
    )
}

Dashboard.propTypes = {
    activeRole: PropTypes.string,
    commons: PropTypes.object,
}

const mapStateToProps = (state) => {
    return {
        activeRole: state.userReducer.activeRoles?.[0],
        commons: state.commonReducer.commons,
    }
}

export default connect(mapStateToProps)(Dashboard)
