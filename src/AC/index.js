import {INCREMENT, DELETE_ARTICLE, SELECT_FILTER, DP_FILTER} from '../constants'

export function increment() {
    const action = {
        type: INCREMENT
    }

    return action
}


export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function setSelectFilter(filter) {
    return {
        type: SELECT_FILTER,
        payload: filter
    }
}

export function setDayPickerFilter(filter) {
    return {
        type: DP_FILTER,
        payload: filter
    }
}