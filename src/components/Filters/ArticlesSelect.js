import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
import {setSelectFilter} from '../../AC'

import 'react-select/dist/react-select.css'

class SelectFilter extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    // state = {
    //     selected: null
    // }

    handleChange = selected => {
        const {setSelectFilter} = this.props
        setSelectFilter(selected)
    }

    render() {
        //const { selected } = this.state
        const { articles, selected } = this.props
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return <Select
            options={options}
            value={selected}
            multi={true}
            onChange={this.handleChange}
        />
    }

}

const mapStateToProps = state => {
    console.log('---', 'SEL, state = ', state)
    return {
        articles: state.articles.map(article => { return {title: article.title, id: article.id}}),
        selected: state.filters.selectFilter
    }
}

export default connect(mapStateToProps, {setSelectFilter})(SelectFilter)