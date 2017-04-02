import React, { Component, PropTypes } from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {connect} from 'react-redux'
import ArticlesPage from './ArticlesPage'
import NotFound from './NotFound'
import Filters from './Filters/index'
import Counter from './Counter'
import CommentsPage from './CommentsPage'
import Menu, {MenuItem} from './Menu/index'
import {loadAllArticles} from '../AC'
import history from '../history'
import Select from 'react-select'

class App extends Component {
    static propTypes = {
    };

    static childContextTypes = {
        user: PropTypes.string,
        lang: PropTypes.string
    }

    state = {
        text: '',
        selected: 'EN'
    }

    getChildContext() {
        return {
            user: this.state.text,
            lang: this.state.selected
        }
    }

    componentDidMount() {
        this.props.loadAllArticles()
    }
    
    localeChange = (selected) => {
        this.setState({
            selected: selected.value
        })
    } 

    render() {
        return (
            <ConnectedRouter history={history}>
                <div>
                    Enter your name: <input type="text" value={this.state.text} onChange={this.handleTextChange}/>
                    <Select
                        options={[{label: 'English', value: 'EN'},{label: 'Русский', value: 'RU'}]}
                        placeholder="Choose language"
                        value={this.state.selected}

                        onChange={this.localeChange}/>
                    <Menu>
                        <MenuItem path="/counter"/>
                        <MenuItem path="/filters"/>
                        <MenuItem path="/articles"/>
                        <MenuItem path="/comments"/>
                    </Menu>
                    <Switch>
                        <Route path="/counter" component={Counter} exact />
                        <Route path="/filters" component={Filters} />
                        <Route path="/articles" component={ArticlesPage} />
                        <Route path="/comments/:page" component={CommentsPage} />
                        <Redirect from="/comments" to="/comments/1"/>
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </ConnectedRouter>
        )
    }

    handleTextChange = ev => {
        if (ev.target.value.length > 10) return

        this.setState({
            text: ev.target.value
        })
    }
}

export default connect(null, { loadAllArticles })(App)