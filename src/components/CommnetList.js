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

    isComments() {
        return this.props.comments && this.props.comments.length > 0
    }

    createBody() {

        const {isOpen} = this.state

        if (isOpen && this.isComments()) {
            return (
                <ul>
                    {this.props.comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
                </ul>
            )
        }
    }

    createButtonText() {

        const {comments} = this.props
        const {isOpen} = this.state

        let text = isOpen ? 'Скрыть' : 'Показать';
        text = this.isComments() ? text + ' - ' + comments.length : null
        return text
    }


    render() {

        const showComments = this.isComments() ? <button onClick={this.handleClick}>{this.createButtonText()}</button> : <p>Нет комментариев</p>

        return (
            <div className="comments-block">
                {showComments}
                {this.createBody()}
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

