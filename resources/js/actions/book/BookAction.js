import {completeExport} from "../../utils";
import api from '../../utils/api'
import {
    addBook,
    addFilter,
    applySearch,
    getBook,
    getBooks,
    removeBook,
    updateBook,
} from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param book
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddBook = (book) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/books', book).then((res) => {
            dispatch(addBook(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Display a listing of the resource.
 * @returns {function(*): Promise<unknown>}
 */
export const handleGetAllBooks = (params, url = "books") => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/${url}?${params}`).then((res) => {
            dispatch(getBooks(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Display a listing of the resource.
 * @returns {function(*): Promise<unknown>}
 */
export const handleSearchBooks = (query) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/books/search/${query}`).then((res) => {
            dispatch(applySearch(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportBooks = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/books?${params}`, {responseType: 'blob'})
            .then((res) => {
                completeExport(res.data, 'hrms-books')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSingleBook = (id, url = 'books') => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/${url}/${id}`).then((res) => {
            dispatch(getBook(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
/**
 * Update the specified resource in storage.
 * @param data
 * @returns {function(*): Promise<unknown>}
 */
export const handleUpdateBook = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/books/${data.get('id')}`, data, {
            // headers: { 'Content-type': 'multipart/book-dashboard-data' }
        }).then((res) => {
            dispatch(updateBook(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Remove the specified resource from storage.
 * @param id
 * @returns {function(*): Promise<unknown>}
 */
export const handleDeleteBook = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/books/${id}`).then((res) => {
            dispatch(removeBook(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
