import { ADD_COMMENT, LOAD_COMMENTS_BY_ARTICLEID, SUCCESS, FAIL, START} from '../constants'
import {Record, Map, List} from 'immutable'
import {arrToMap} from './utils'

const CommentModel = Record({
    id: null,
    user: '',
    text: ''
})

const DefaultReducerState = Record({
    entities: new Map({}),
    loaded: new List([]),
    loading: false,
    error: null
})

export default (comments = new DefaultReducerState(), action) => {
    const { type, payload, randomId, response, error, articleId } = action

    switch (type) {
        case ADD_COMMENT:
            return comments.setIn(['entities', randomId], new CommentModel({
                id: randomId,
                ...payload.comment
            }))

        case LOAD_COMMENTS_BY_ARTICLEID + START:
            return comments.set('loading', true)

        case LOAD_COMMENTS_BY_ARTICLEID + SUCCESS:
            return comments
                .mergeIn(['entities'], arrToMap(payload.response, CommentModel))
                .mergeIn(['loaded'], articleId)
                .set('loading', false)

        case LOAD_COMMENTS_BY_ARTICLEID + FAIL:
            return comments
                .set('error', error.statusText)
                .set('loading', false)
    }

    return comments
}