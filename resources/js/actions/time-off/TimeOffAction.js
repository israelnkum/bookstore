import api from "../../utils/api";
import {requestTimeOff} from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param data
 * @returns {function(*): Promise<unknown>}
 */
export const handleRequestTimeOff = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/leave-request', data).then((res) => {
            dispatch(requestTimeOff(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
