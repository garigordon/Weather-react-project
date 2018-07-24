import React, {Component} from 'react'
import {connect} from 'react-redux'
import '../static/styles/app.css'
import Search from './weather/Search'
import WeatherPage from './weather/WeatherPage'
import RegistrationPage from './RegisterUser/RegistrationPage'
import LoginPage from './LoginUser/LoginPage'
import Weather from './weather/Weather'
import {initAppSelector, checkAndInitApp, lastCitySelector} from '../ducks/app'
import { Route, Redirect, Switch } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'


class App extends Component {
    state = {
        isWeatherView : true,
    }

    render() {
        const {appIsInited} = this.props
        if (!appIsInited) return <div className="wrapper"><h1>Loading...</h1></div>

        return (
            <div className="wrapper">
                <Switch>
                    <Route path="/" exact component={Weather} />
                    {/*<Route path="/home" component={Weather} />*/}
                    <Redirect from="/home" to="/"/>
                    <Route path="/weather" component={WeatherPage} />
                    <Route path="/registration" component={RegistrationPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/search" component={Search} />
                    <Route path = '*' component = {NotFoundPage} />
                </Switch>
            </div>
        )
    }

    componentDidMount() {
        const {checkAndInitApp} = this.props
        checkAndInitApp()
    }
}

let mapStateToProps = (state, ownProps) => {
    return {
        lastCity : lastCitySelector(state),
        appIsInited : initAppSelector(state)
    }
}

let mapDispatchToProps = {
    checkAndInitApp,
}

let decorator = connect(mapStateToProps, mapDispatchToProps, null, {pure:false})
// {pure : false} -- this option remove over optimization, because of which the router isn't working properly

let connectedApp = decorator(App)

export default connectedApp
