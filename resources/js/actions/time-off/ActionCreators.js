import { Types } from './Types'

/**
 *
 * @param payload
 * @returns {{payload, type: string}}
 */
export const requestTimeOff = (payload) => {
  return {
    type: Types.REQUEST_TIME_OFF,
      payload: payload
  }
}

/**
 *
 * @param payload
 * @returns {{payload, type: string}}
 */
export const getHolidays = (payload) => {
  return {
    type: Types.GET_HOLIDAYS,
      payload: payload
  }
}

/**
 *
 * @param payload
 * @returns {{payload, type: string}}
 */
export const getLeaveTypes = (payload) => {
  return {
    type: Types.GET_LEAVE_TYPES,
      payload: payload
  }
}

/**
 *
 * @param payload
 * @returns {{payload, type: string}}
 */
export const getLeaveRequests = (payload) => {
  return {
    type: Types.GET_TIME_OFF_REQUESTS,
      payload: payload
  }
}

/**
 *
 * @param payload
 * @returns {{payload, type: string}}
 */
export const changeLeaveRequestStatus = (payload) => {
  return {
    type: Types.CHANGE_LEAVE_STATUS,
      payload: payload
  }
}
/**
 *
 * @param payload
 * @returns {{payload, type: string}}
 */
export const getTimeOff = (payload) => {
  return {
    type: Types.GET_TIME_OFF,
      payload: payload
  }
}

export const addFilter = (payload) => {
  return {
    type: Types.ADD_TIME_OFF_FILTER,
    payload: payload
  }
}
