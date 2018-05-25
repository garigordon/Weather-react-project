import React, {Component} from 'react'
import '../static/styles/app.css'
import {appFetch} from './../helpers'
import {connect} from 'react-redux'
import {
    currentWeatherLoadingStateSelector,
    addCityWeather,
    START_LOADING,
    END_LOADING,
    citySelector,
    weatherListSelector
} from './../ducks/currentWeather'

class WeatherList extends Component{
    render(){
        const {weatherList} = this.props
        return(
            <div className="list-city">
                <ul>
                    {
                        weatherList.map((item) => {
                        //return <WeatherItem key={item.dt} item = {item} />

                        let {dt, dt_txt, main, weather} = item
                        let {temp} = main
                        let {description} = weather
                            console.log('--- list item', item)
                        return (
                            <li key={dt}>
                                <div className="cloudness-icon">

                                </div>
                                <p>{dt_txt}</p>
                                <p className="temprature">{Math.floor(temp)} <span className="temprature-unit">°C</span></p>
                                <p className="cloudness-text">{description}</p>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

let mapStateToProps = (state, ownProps) => {
    return {
        isLoading : currentWeatherLoadingStateSelector(state),
        cityName : citySelector(state),
        weatherList : weatherListSelector(state),
    }
}

let decorator = connect(mapStateToProps)
let connectedWeatherList = decorator(WeatherList)

export default connectedWeatherList
