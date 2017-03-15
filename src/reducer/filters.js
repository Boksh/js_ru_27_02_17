import {SELECT_FILTER, DP_FILTER, DELETE_ARTICLE} from '../constants'

const initialState = {
    selectFilter: [],
    dpFilter: {
        from: null,
        to: null
    }
}

export default (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SELECT_FILTER:
            return {
                ...state,
                selectFilter: payload
            }
        case DP_FILTER:
            return {
                ...state,
                dpFilter: payload
            }
        case DELETE_ARTICLE:
            if (state.selectFilter)
                return {
                    ...state,
                    //хорошо, но я б в AC делал
                    selectFilter: state.selectFilter.filter(filter => filter.value !== payload.id)
                }
            else {
                return state
            }

    }
    return state
}
