import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import DayPicker, {DateUtils} from "react-day-picker";
import "react-day-picker/lib/style.css"
import "./style.css"

class SelectDay extends Component {
    constructor() {
        super()
        this.state = {
            initialMonth: new Date(2017, 2),
            selectedDays: {
                from: null,
                to: null
            }
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
                { ' ' }<a href="." onClick={ this.handleResetClick }>Сбросить </a>
            </p>
        }
    }

    handleDayClick = day => {
        const range = DateUtils.addDayToRange(day, this.state.selectedDays);
        this.setState({selectedDays: range});
    }

    handleResetClick = e => {
        e.preventDefault();
        this.setState({
            selectedDays: {
                from: null,
                to: null
            }
        });
    }
    render() {
        return (
            <div id="dayPicker">
                <label>{this.getCalendarText()}</label>
                <DayPicker
                    initialMonth={ this.state.initialMonth }
                    selectedDays={ this.state.selectedDays }
                    onDayClick={ this.handleDayClick }
                />
            </div>
        );
    }
}

SelectDay.propTypes = {};
//SelectDay.defaultProps = {};

export default SelectDay;