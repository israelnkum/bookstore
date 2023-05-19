import { Types } from '../actions/time-off/Types'

const initialState = {
    holidays: [],
    leaveTypes: [],
    leaveRequest: {},
    leaveRequests: {
        data: [],
        meta: {}
    },
    filter: {
        status: 'Pending'
    }
}

export default function timeOffReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_HOLIDAYS:
            return {...state, holidays: action.payload}

        case Types.GET_LEAVE_TYPES:
            return {...state, leaveTypes: action.payload}

        case Types.GET_TIME_OFF_REQUESTS:
            return {...state, leaveRequests: action.payload}

        case Types.GET_TIME_OFF:
            return {...state, leaveRequest: action.payload}

        case Types.ADD_TIME_OFF_FILTER:
            return {...state, filter: action.payload}

        case Types.CHANGE_LEAVE_STATUS:
            return {
                ...state,
                leaveRequests: {
                    ...state.leaveRequests,
                    data: state.leaveRequests.data.map((leave) => {
                        return leave.id === action.payload.id ? action.payload : leave
                    })
                }
            }
        default:
            return state
    }
}
