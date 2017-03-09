import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'

class CommentList extends Component {

    constructor() {
        super()
        this.state = {
            name : '',
            text: ''
        }
    }

    static propTypes = {
        comments: PropTypes.array
    }

    static defaultProps = {
        comments: []
    }

    componentDidUpdate() {
        this.size = this.container.getBoundingClientRect()
    }

    render() {
        const {isOpen, toggleOpen} = this.props
//        console.log('---', this.size)
        return (
            <div ref={this.getContainerRef}>
                <a href="#" onClick={toggleOpen}>{isOpen ? 'hide' : 'show'} comments</a>
                {this.getBody()}
                <form>
                    <div>
                        <label>
                            Имя:
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={this.validateName} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Комментарий:
                            <textarea
                                type="text"
                                value={this.state.text}
                                onChange={this.validateComment} />
                        </label>
                    </div>
                    <input type="submit" value="Submit" onClick={this.commentAdd} />
                </form>
            </div>
        )
    }

    commentAdd = ev => {
        ev.preventDefault()
        console.log(`Добавление коммента. Имя: ${this.state.name}, Текст: ${this.state.text}`);
        this.setState({
            name: '',
            text: ''
        })
    }

    validateName = ev => {
        if (ev.target.value.length > 10) {
            console.warn('Имя не должно быть больше 10 знаков')
            ev.target.style.borderColor = "red"
            return
        } else {
            ev.target.style.borderColor = ""
        }

        this.setState({
            name: ev.target.value
        })
    }

    validateComment = ev => {
        if (ev.target.value.length > 150) {
            console.warn('Комментарий не должен быть больше 150 знаков')
            ev.target.style.borderColor = "red"
            return
        } else {
            ev.target.style.borderColor = ""
        }

        this.setState({
            text: ev.target.value
        })
    }

    getContainerRef = (ref) => {
        this.container = ref
        if (ref) {
            this.size = ref.getBoundingClientRect()
        }
    }

    getBody() {
        const {comments, isOpen} = this.props
        if (!isOpen) return null

        if (!comments.length) {
            return <div>
                <h3>
                    No comments yet
                </h3>
            </div>
        }

        const commentItems = comments.map(comment => <li key={comment.id}><Comment comment={comment} /></li>)
        return (
            <div>
                <ul>
                    {commentItems}
                </ul>
            </div>
        )
    }
}

export default toggleOpen(CommentList)