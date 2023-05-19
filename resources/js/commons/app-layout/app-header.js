import {Affix, Dropdown, Space, Spin} from 'antd'
import PropTypes from "prop-types";
import React, {useState} from 'react'
import {FiChevronDown, FiLogOut} from "react-icons/fi";
import {connect, useDispatch} from 'react-redux'
import {logout} from '../../actions/logout/LogoutAction'
import TlaImage from "../tla-image";

function AppHeader({user, collapseButton}) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const handleLogout = () => {
        setLoading(true)
        dispatch(logout()).then(() => {
            window.location.reload()
            window.location.replace('/landing')
            setLoading(false)
        })
    }
    const items = [
        {
            key: 'logout',
            label: <p title={ 'Logout' } onClick={ () => handleLogout() }>Logout</p>,
            icon: <FiLogOut/>
        },
    ];

    return (
        <Affix offsetTop={ 1 }>
            <div className={ 'bg-white h-[60px] px-2 md:px-5 flex items-center justify-between border-bottom' }>
                <div>
                    {collapseButton}
                </div>
                <Space size={'large'}>
                    <Spin spinning={ loading }>
                        <Dropdown
                            menu={ {items} }>
                            <a onClick={ (e) => e.preventDefault() }>
                                <Space>
                                    Hi { user?.name?.split(' ')[0] }
                                    <TlaImage name={ user.name } size={ 30 } src={ '' }/>
                                    <FiChevronDown/>
                                </Space>
                            </a>
                        </Dropdown>
                    </Spin>
                </Space>
            </div>
        </Affix>
    )
}

AppHeader.propTypes = {
    user: PropTypes.object.isRequired,
    collapseButton : PropTypes.any
}

const mapStateToProps = (state) => ({
    user: state.userReducer.loggedInUser,
})

export default connect(mapStateToProps)(AppHeader)
