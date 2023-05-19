import { Types } from './Types'


export const getBooks = (payload) => {
    return {
        type: Types.GET_BOOKS,
        payload: payload
    }
}

export const applySearch = (payload) => {
    return {
        type: Types.APPLY_SEARCH_RESULTS,
        payload: payload
    }
}

export const getBook = (payload) => {
    return {
        type: Types.GET_BOOK,
        payload: payload
    }
}

export const addBook = (payload) => {
    return {
        type: Types.ADD_BOOK,
        payload: payload
    }
}

export const removeBook = (id) => {
    return {
        type: Types.REMOVE_BOOK,
        id: id
    }
}

export const updateBook = (payload) => {
    return {
        type: Types.UPDATE_BOOK,
        payload: payload
    }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_BOOK_FILTER,
        payload: payload
    }
}
