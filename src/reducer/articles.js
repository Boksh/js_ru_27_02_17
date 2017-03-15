import {articles} from '../fixtures'
import {DELETE_ARTICLE} from '../constants'

export default (state = articles, action) => {
    const { type, payload } = action
    // console.log('---RED' + JSON.stringify(state));
    console.log('---RED' + JSON.stringify(action) + "    " + new Date());
    switch (type) {
        case DELETE_ARTICLE:
            return state.filter(article => article.id !== payload.id)
    }

    return state
}