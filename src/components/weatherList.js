import React, {Component} from 'react'
import Slider from "react-slick";
import '../static/styles/app.css'
import {getIconSrc, parseTime} from './../helpers'
import {connect} from 'react-redux'
import {
    currentWeatherLoadingStateSelector,
    addCityWeather,
    START_LOADING,
    END_LOADING,
    citySelector,
    weatherListSelector
} from './../ducks/currentWeather'
import moment from 'moment'


class WeatherList extends Component{
    render(){
        const {weatherList} = this.props
        const settings = {
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 8,
            slidesToScroll: 1
        };
        return(
            <div className="list-city">
                <Slider {...settings}>
                    {
                        weatherList.map((item) => {
                            //return <WeatherItem key={item.dt} item = {item} />
                            let {dt, dt_txt, main, weather} = item
                            let {temp} = main
                            let {description, icon} = weather[0] || {}
                            console.log('--- list item', item)

                            let _moment = parseTime(dt_txt)
                            // TODO
                            let momentDate = _moment.format("ddd MM")
                            let momentTime = _moment.format("HH : mm")

                            return (
                                <div key={dt} className="weather-item">
                                    <p className="datetime">{momentDate}</p>
                                    <p className="datetime">{momentTime}</p>
                                    <div className="cloudness-icon">
                                        <img src={getIconSrc(icon)} alt=""/>
                                    </div>
                                    <p className="temprature">{Math.floor(temp)} <span className="temprature-unit">°C</span></p>
                                    <p className="cloudness-text">{description}</p>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        )
    }
}

let mapStateToProps = (state, ownProps) => {
    return {
        isLoading : currentWeatherLoadingStateSelector(state), // Why do you need this ?
        cityName : citySelector(state), // Why do you need this ?
        weatherList : weatherListSelector(state),
    }
}

let decorator = connect(mapStateToProps)
let connectedWeatherList = decorator(WeatherList)

export default connectedWeatherList
