import React, {Component} from 'react'
import CommentList from './CommnetList'

class Article extends Component {

    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }

    render() {
        const {article} = this.props
        const {isOpen} = this.state
        const body = isOpen ? <section>{article.text}</section> : null
        return (
            <div>
                <h3 onClick={this.handleClick}>{article.title}</h3>
                {body}
                <CommentList comments={article.comments}/>
            </div>
        )
    }

    handleClick = (ev) => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default Article