import React from 'react'
import {Outlet, useLocation} from 'react-router'
import {Route, Routes} from 'react-router-dom'
import {ModalRoutes} from "./ModalRoutes";
import PageWrapper from "../../components/admin/page-wrapper";
import AllBooks from "../../components/books/all-books";
import BookDetail from "../../components/books/book-detail";
import Dashboard from "../../components/dashboard";

const ProtectedRoutes = () => {
    const location = useLocation()
    const background = location.state && location.state.background

    return (
        <>
            {background && (<React.Fragment><ModalRoutes/> <Outlet/></React.Fragment>)}
            <Routes location={background || location}>
                <Route exact element={<Dashboard/>} path='home'/>
                <Route exact element={<Dashboard/>} path='/'/>
                <Route exact element={<Dashboard/>} path='/js/*'/>
                <Route element={<PageWrapper/>}>
                    <Route element={<AllBooks/>} path='books'/>
                    <Route element={<BookDetail/>} path='books/:id/details'/>
                </Route>
                <Route exact>
                    <>not found</>
                </Route>
            </Routes>
        </>
    )
}

export default ProtectedRoutes
