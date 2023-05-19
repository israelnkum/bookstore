import React, { useState } from 'react'
import { Menu } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'

const rootSubmenuKeys = []

function MenuHelper({permissions, menus, direction, icons, linkStyles}) {
    const location = useLocation()
    const [openKeys, setOpenKeys] = useState([])

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    }

    function getItem(label, icon, key, children) {
        return {
            key,
            icon,
            children,
            label,
        }
    }

    const items = menus.map((nav, index) => {
        rootSubmenuKeys.push(nav.title)
        return (nav.permissions.length === 0 || permissions.some(role => nav.permissions.includes(role))) &&
            getItem(<Link className={ 'nav-item' } style={ linkStyles }
                          to={ nav.link }>{ nav.title }</Link>,
                icons[nav.icon] ?? '',
                nav.title + index,
                nav.children.length > 0 && nav.children.map((child) => (
                        (child.permission === '' ?
                                getItem(
                                    <Link className={ 'nav-item' }
                                          style={ linkStyles }
                                          state={ {background: child.modal && location} }
                                          to={ child.link }>
                                        { child.title }
                                    </Link>, icons[child.icon] ?? '', child.title + index
                                ) : permissions.includes(child.permission) &&
                                getItem(
                                    <Link className={ 'nav-item !text-capitalize' } style={ linkStyles }
                                          state={ {background: child.modal && location} } to={ child.link }>
                                        { child.title }
                                    </Link>, icons[child.icon] ?? '', child.title + index
                                )
                        )
                    )
                )
            )
    })

    return (
        <Menu
            className={ 'sideBarNav' }
            defaultSelectedKeys={ ['home'] } openKeys={ openKeys } onOpenChange={ onOpenChange }
            mode={ direction }
            theme="light"
            items={ items }
        />
    )
}

MenuHelper.defaultProps = {
    direction: 'inline',
    icons: {},
    permissions: []
}

MenuHelper.propTypes = {
    menus: PropTypes.array.isRequired,
    direction: PropTypes.string,
    permissions: PropTypes.array,
    icons: PropTypes.object,
    linkStyles: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        permissions: state.userReducer.permissions,
    }
}

export default connect(mapStateToProps)(MenuHelper)
