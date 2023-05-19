import React from 'react'
import {Route, Routes} from 'react-router-dom'
import PreviewFile from "../preview-file";
import BookForm from "../../components/books/book-form";

export const ModalRoutes = () => {
    return (
        <Routes>
            <Route exact path="preview/:fileName" element={<PreviewFile/>}/>
            <Route exact path="books/form" element={<BookForm/>}/>
        </Routes>
    )
}
