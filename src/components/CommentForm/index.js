import React, {Component, PropTypes} from 'react';
import './style.css'

class CommentForm extends Component {

    getInitialState = () => {
        return {
            name: '',
            //лучше хранить минимальный стейт. У тебя есть isNameValid - nameStyle уже лишнее
            nameStyle: {
                borderColor: ''
            },
            text: '',
            textStyle: {
                borderColor: ''
            },
            isNameValid: true,
            isTextValid: true
        }
    }

    constructor() {
        super()
        this.state = this.getInitialState();
    }

    commentAdd = ev => {
        ev.preventDefault()
        if (this.state.isNameValid & this.state.isTextValid) {
            console.log(`Добавление коммента. Имя: ${this.state.name}, Текст: ${this.state.text}`);
            this.setState(this.getInitialState());
        } else {
            console.warn(`Форма не валидная, добавление комментиря не возможно`);
        }
    }

    validateName = ev => {
        if (ev.target.value.length > 10) {
            console.warn('Имя не должно быть больше 10 знаков')
            this.setState({
                nameStyle: {
                    borderColor: 'red'
                },
                isNameValid: false
            })
            return
         }

        this.setState({
            name: ev.target.value,
            nameStyle: {
                borderColor: ''
            },
            isNameValid: true
        })
    }

    validateComment = ev => {
        if (ev.target.value.length > 150) {
            console.warn('Комментарий не должен быть больше 150 знаков')
            this.setState({
                textStyle: {
                    borderColor: 'red'
                },
                isTextValid: false
            })
            return
        }

        this.setState({
            text: ev.target.value,
            textStyle: {
                borderColor: ''
            },
            isTextValid: true
        })
    }

    render() {
        return (
            <div>
                <form id="commentForm">
                    <div>
                        <label>
                            Имя:
                            <input
                                type="text"
                                value={this.state.name}
                                style={this.state.nameStyle}
                                onChange={this.validateName}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Комментарий:
                            <textarea
                                type="text"
                                value={this.state.text}
                                style={this.state.textStyle}
                                onChange={this.validateComment}/>
                        </label>
                    </div>
                    <div>
                        <input type="submit" value="Submit" onClick={this.commentAdd}/>
                    </div>
                </form>
            </div>
        );
    }
}

// CommentForm.propTypes = {
//
// };
//CommentForm.defaultProps = {};

export default CommentForm;
