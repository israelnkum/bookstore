import React from 'react'
import {Outlet, useLocation} from 'react-router'
import {Route, Routes} from 'react-router-dom'
import {ModalRoutes} from "./ModalRoutes";
import LandingPage from "../../components/landing-page";
import BookDetail from "../../components/landing-page/book-detail";

const PublicRoutes = () => {
    const location = useLocation()
    const background = location.state && location.state.background

    return (
        <>
            {background && (<React.Fragment><ModalRoutes/> <Outlet/></React.Fragment>)}
            <Routes location={background || location}>
                <Route element={<LandingPage/>} path='landing'/>
                <Route element={<BookDetail/>} path='/landing/book/detail'/>
                <Route exact>
                    <>not found</>
                </Route>
            </Routes>
        </>
    )
}

export default PublicRoutes
