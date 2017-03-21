import {normalizedArticles} from '../fixtures'
import {DELETE_ARTICLE, ADD_COMMENTS} from '../constants'

export default (state = normalizedArticles, action) => {
    const { type, payload } = action

    switch (type) {
        case DELETE_ARTICLE:
            return state.filter(article => article.id !== payload.id)
        case ADD_COMMENTS:
            console.log('--- ' + JSON.stringify(payload));
            return state.map(article => {
                if (article.id !== payload.articleId) return article
                return {
                    ...article,
                    comments: [
                        ...article.comments,
                        payload.comment.id
                    ]
                }
            })
    }

    return state
}

//store.dispatch({type: 'ADD_COMMENTS', payload: {text: 'AAAA', user: 'BBB CCC', articleId: '56c782f18990ecf954f6e027'}})