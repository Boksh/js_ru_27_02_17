import React, { Component, PropTypes } from 'react'
import ArticleList from './ArticleList/index'
import Chart from './Chart'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import SelectDay from './SelectDay/index'

class App extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    state = {
        text: '',
        selected: null,
        selectedDays: {
            from: null,
            to: null
        }
    }

    render() {
        const {articles} = this.props
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return (
            <div>
                Enter your name: <input type="text" value={this.state.text} onChange={this.handleTextChange}/>
                <Select options={options} value={this.state.selected} onChange={this.handleSelectChange} multi/>
                <Chart articles={this.props.articles}/>
                <SelectDay/>
                <ArticleList articles={this.props.articles}/>
            </div>
        )
    }

    handleSelectChange = selected => {
        this.setState({selected})
    }

    handleTextChange = ev => {
        if (ev.target.value.length > 10) return

        this.setState({
            text: ev.target.value
        })
    }
}

export default App;