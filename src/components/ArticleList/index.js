import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import Article from '../Article/index'
import CSSTransition from 'react-addons-css-transition-group'
import accrdion from '../../decorators/accordion'
import './style.css'

class ArticleList extends Component {
    render() {
        const {articles, toggleOpenItem, isItemOpened} = this.props

        const articleComponents = articles.map(article => <li key={article.id}>
            <Article article={article}
                     isOpen={isItemOpened(article.id)}
                     toggleOpen={toggleOpenItem(article.id)}
            />
        </li>)

        return (
            <CSSTransition component="ul"
                           transitionName="article-list"
                           transitionAppear={true}
                           transitionAppearTimeout={100}
                           transitionEnterTimeout={500}
                           transitionLeaveTimeout={300}
            >
                {articleComponents}
            </CSSTransition>
        )
    }
}

const mapStateToProps = state => {
    console.log('---', 'AL, state = ', state)
    //все правильно, но тут .slice() ничего не решает
    let artFiltes = state.articles.slice()

    if (state.filters.selectFilter && state.filters.selectFilter.length > 0) {
        let filter = state.filters.selectFilter.map(filter => filter.value);
        artFiltes = artFiltes.filter(article => filter.indexOf(article.id) > -1)
    }

    if (state.filters.dpFilter) {
        artFiltes = artFiltes.filter(article => {
            let bool = true

            if (state.filters.dpFilter.from !== null) {
                bool &= (Date.parse(article.date) >= Date.parse(state.filters.dpFilter.from))
            }

            if (state.filters.dpFilter.to !== null) {
                bool &= (Date.parse(article.date) <= Date.parse(state.filters.dpFilter.to))
            }

            return bool
        })

    }

    return {
        articles:  artFiltes
    }
}

export default connect(mapStateToProps)(accrdion(ArticleList))

ArticleList.propTypes = {
    articles: PropTypes.array.isRequired,
    isItemOpened: PropTypes.func.isRequired,
    toggleOpenItem: PropTypes.func.isRequired
}
