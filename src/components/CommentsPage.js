import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import Pagination from './Pagination'
import { getComments } from '../selectors/index'
import {Route} from 'react-router-dom'
import { loadCommentList } from '../AC/index'
import Loader from './Loader'
import Comment from './Comment'

class CommentsPage extends Component {
    constructor(){
        super()
        this.state = {
            limit: 5
        }
    }

    // componentWillMount() {
    //     const { match } = this.props
    //     // if (match.props && match.props.page) {
    //     //     console.log('---2 ', match.props.page);
    //     // } else {
    //     //     console.log('---1 ');
    //     // }
    // }


    render() {
        const {match} = this.props
        const {limit} = this.state
        return (
            <div>
                <Pagination limit={limit} totalPage={16} path={match.url} clickFunc={this.paginationClick}/>
                {this.getComments()}
            </div>
        );
    }

    paginationClick = (page) => () => {
        const { loadCommentList, loaded } = this.props
        if (loaded.indexOf(page) !== -1) return null
        loadCommentList(page)
    }

    getComments() {
        const {loading, loaded, comments} = this.props

        if (loading) return <Loader />

        const commentItems = comments.keySeq().toArray().map((id) => <li key={id}><Comment id={parseInt(id)}/></li>)
        return (
            <div>
                <ul>
                    {commentItems}
                </ul>
            </div>
        )
    }
}

CommentsPage.propTypes = {};

function mapStateToProps(state) {
    return {
        comments: getComments(state),
        loading: state.comments.loading,
        loaded: state.comments.loaded,
    }
}

export default connect(mapStateToProps, { loadCommentList })(CommentsPage);
