import React, { Component, PropTypes } from 'react'
import ArticleList from './ArticleList/index'
import Chart from './Chart'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import moment from 'moment';
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css"

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
    getCalendarText = () => {
        const {from, to} = this.state.selectedDays;

        if (!from && !to) {
            return <p>Выберите <strong>первый день</strong>.</p>
        } else if (from && !to) {
            return <p>Выберите <strong>последний день</strong>.</p>
        } else if (from && to) {
            moment.locale('ru')
            return <p>
                Вы выбралидни с { moment(from).format('LL') } по { moment(to).format('LL') }.
                { ' ' }<a href="." onClick={ this.handleResetClicke }>Сбросить </a>
            </p>
        }
    }

    render() {
        const {articles} = this.props
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))
        const styleDP = {
            width: '300px'
        }
        return (
            <div>
                Enter your name: <input type="text" value={this.state.text} onChange={this.handleTextChange}/>
                <Select options={options} value={this.state.selected} onChange={this.handleSelectChange} multi/>
                <Chart articles={this.props.articles}/>
                <div style={styleDP}>
                    <label>{this.getCalendarText()}</label>
                    <DayPicker
                        initialMonth={ new Date(2017, 2) }
                        selectedDays={ this.state.selectedDays }
                        onDayClick={ this.handleDayClick }
                    />
                </div>

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

    handleDayClick = day => {
        const range = DateUtils.addDayToRange(day, this.state.selectedDays);
        this.setState({selectedDays: range});
    }

    handleResetClicke = e => {
        e.preventDefault();
        this.setState({
            selectedDays: {
                from: null,
                to: null
            }
        });
    }
}

export default App;