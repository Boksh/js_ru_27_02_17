import uuidV4 from 'uuid/v4'
import { ADD_COMMENTS } from '../constants'

export default store => next => action => {

    const { type, payload } = action

    switch (type) {
    //через мидлвары будет проходить каждый экшин, они должны быть максимально общими, завязывать на конкретные экшины - плохая практика
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
