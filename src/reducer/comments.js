import {normalizedComments} from '../fixtures'
import { ADD_COMMENTS  } from '../constants'

export default (comments = normalizedComments, action) => {

    const { type, payload } = action

    switch (type) {
        case ADD_COMMENTS:
            return [
                ...comments,
                payload.comment
            ]
    }

    return comments
}