/**
 * Created by Boksh on 02.03.2017.
 */

import React, {Component} from 'react'
import Comment from './Comment'

class CommentList extends Component {

    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }

    render() {
        const {comments} = this.props
        const {isOpen} = this.state
        const isComments = comments && comments.length > 0

        // какая-то кривота, или нормально? Как сделать изящнее?
        const body = () => {
            if (isOpen && isComments) {
                return (
                    <ul>
                        {comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
                    </ul>
                )
            }
        }

        const buttonText = () => {
            let text = isOpen ? 'Скрыть' : 'Показать';
            text = isComments ? text + ' - ' + comments.length : null
            return text
        }

        const showComments = isComments ? <button onClick={this.handleClick}>{buttonText()}</button> : <p>Нет комментариев</p>

        return (
            <div className="comments-block">
                {showComments}
                {body()}
            </div>
        )
    }

    handleClick = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default CommentList

