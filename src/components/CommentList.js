import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'
import { loadCommentsByArticleId } from '../AC'
import Loader from './Loader'

class CommentList extends Component {

    static propTypes = {
        article: PropTypes.object.isRequired
    }

    componentDidUpdate() {
        this.size = this.container.getBoundingClientRect()
    }

    componentWillReceiveProps({isOpen, isComments, loading, loadCommentsByArticleId, article}) {
        if (!this.props.isOpen && isOpen && !isComments && !loading) loadCommentsByArticleId(article.id)
    }

    render() {
        const {isOpen, toggleOpen} = this.props
//        console.log('---', this.size)
        return (
            <div ref={this.getContainerRef}>
                <a href="#" onClick={toggleOpen}>{isOpen ? 'hide' : 'show'} comments</a>
                {this.getBody()}
            </div>
        )
    }

    getContainerRef = (ref) => {
        this.container = ref
        if (ref) {
            this.size = ref.getBoundingClientRect()
        }
    }

    getBody() {
        const {article, isOpen, loading} = this.props
        if (!isOpen) return null
        if (loading) {
            return <Loader />
        }

        if (!article.comments || !article.comments.length) {
            return <div>
                <h3>
                    No comments yet
                </h3>
                <NewCommentForm articleId={article.id} />
            </div>
        }

        const commentItems = article.comments.map(id => <li key={id}><Comment id={id} /></li>)
        return (
            <div>
                <ul>
                    {commentItems}
                </ul>
                <NewCommentForm articleId={article.id} />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        isComments: !state.comments.loaded.indexOf(props.article.id) < 0,
        loading: state.comments.loading,
        error: state.comments.error
    }
}

export default connect(mapStateToProps, {loadCommentsByArticleId})(toggleOpen(CommentList))