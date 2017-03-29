import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS, LOAD_COMMENT_LIST, START, SUCCESS } from '../constants'
import {arrToMap} from './utils'
import {Record, Map} from 'immutable'

const CommentModel = Record({
    id: null,
    user: '',
    text: ''
})

const DefaultReducerState = Record({
    entities: new Map({}),
    loading: false,
    loaded: []
})


export default (comments = new DefaultReducerState(), action) => {
    const { type, payload, randomId } = action

    switch (type) {
        case ADD_COMMENT:
            return comments.set(randomId, new CommentModel({
                id: randomId,
                ...payload.comment
            }))

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return comments.mergeIn(['entities'], arrToMap(payload.response, CommentModel))

        case LOAD_COMMENT_LIST + START:
            return comments.setIn(['loading'], true)

        case LOAD_COMMENT_LIST + SUCCESS:
            return comments
                    .setIn(['loading'], false)
                    .updateIn(['loaded'], (arr) => {
                        if (arr.indexOf(payload.page) !== -1) return arr
                        return arr.concat(payload.page)
                    })
                    .mergeIn(['entities'], arrToMap(payload.response.records, CommentModel))
    }

    return comments
}