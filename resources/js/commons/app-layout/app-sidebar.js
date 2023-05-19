import {Affix, Layout} from 'antd'
import PropTypes from "prop-types";
import React from 'react'
import {FiBook, FiHome} from "react-icons/fi";
import {connect} from "react-redux";
import {SidebarMenus} from "../../utils/side-bar-menu";
import MenuHelper from "../menu-helper";
import SideProfile from "./side-profile";

function AppSidebar(props) {
    const {name, collapsed} = props

    return (
        <Affix offsetTop={ 1 }>
            <Layout.Sider style={{
                overflow: 'auto',
                height: '100vh'
            }} theme={ 'light' } trigger={ null } collapsible collapsed={ collapsed }>
                <div className={ 'flex justify-center items-center text-uppercase mb-2 pt-3' }>
                    {
                        collapsed ? 'BS' : 'BookStore'
                    }
                </div>
                <div align={ 'center' }>
                    <SideProfile collapsed={ collapsed } size={ collapsed ? 30 : 50 } name={ name }/>
                </div>
                <MenuHelper icons={ {
                    home: <FiHome/>,
                    books: <FiBook/>
                } } menus={ SidebarMenus } direction={ 'inline' }/>
            </Layout.Sider>
        </Affix>
    )
}

AppSidebar.defaultProps = {
    collapsed: false,
    name: 'Default'
}

AppSidebar.propTypes = {
    name: PropTypes.string,
    collapsed: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    name: state.userReducer.loggedInUser.name,
})

export default connect(mapStateToProps)(AppSidebar)
