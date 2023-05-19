import { Types } from '../actions/book/Types'
const initialState = {
    books: {
        data: [],
        meta: {}
    },
    book: {},
    filter: {
        department_id: 'all',
        rank_id: 'all',
        educational_level_id: 'all',
        job_category_id: 'all'
    }
}

export default function bookReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_BOOKS:
            return { ...state, books: action.payload }

        case Types.ADD_BOOK_FILTER:
            return { ...state, filter: action.payload}

        case Types.GET_BOOK:
            return { ...state, book: action.payload }

        case Types.ADD_BOOK:
            return {
                ...state,
                books: { ...state.books, data: state.books.data.concat(action.payload) }
            }

        case Types.UPDATE_BOOK:
            return {
                ...state,
                book: action.payload,
                books: {
                    ...state.books,
                    data: state.books.data.map((book) => {
                        return book.id === action.payload.id ? action.payload : book
                    })
                }
            }

        case Types.REMOVE_BOOK:
            return {
                ...state,
                books: { ...state.books, data: state.books.data.filter((book) => book.id !== action.id) }
            }

        default:
            return state
    }
}
