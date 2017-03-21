import uuidV4 from 'uuid/v4'
import { ADD_COMMENTS } from '../constants'

export default store => next => action => {

    const { type, payload } = action

    switch (type) {
        case ADD_COMMENTS: {
            next({
                ...action,
                payload: {
                    ...payload,
                    comment : addIdToObject(payload.comment),
                }
            })
            break
        }
        default: next(action)
    }
}

const addIdToObject = object => {
    return {
        ...object,
        id: uuidV4()
    }
}