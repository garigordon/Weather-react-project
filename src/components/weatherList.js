import React, {Component} from 'react'
import Slider from "react-slick";
import '../static/styles/app.css'
import {getIconSrc, parseTime} from './../helpers'
import {connect} from 'react-redux'
import {
    weatherListSelector,
    changeCursor,
} from './../ducks/currentWeather'
import cn from 'classnames'


class WeatherList extends Component{
    render(){
        const {weatherList} = this.props
        const settings = {
            dots: false,
            arrows: true,
            infinite: false,
            speed: 500,
            slidesToShow: 8,
            slidesToScroll: 4,
        };
        /*console.log('--- weather list props', this.props)*/
        return(
            <div className="list-city">
                <Slider {...settings}>
                    {
                        weatherList.map((item, index) => {
                            //return <WeatherItem key={item.dt} item = {item} />
                            let {dt, dt_txt, main, weather} = item
                            let {temp} = main
                            let {description, icon} = weather[0] || {}
                           /* console.log('--- list item', item)*/

                            let _moment = parseTime(dt_txt)
                            let momentDate = _moment.format("ddd DD")
                            let momentTime = _moment.format("HH : mm")

                            // TODO check if item is active -- if cursor === index
                            let isActive

                            return (
                                <div key={dt} onClick={this.handleClick(index)} className={cn({
                                    "weather-item" : 1,
                                    "active" : isActive,
                                })}>
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

    handleClick = (index) => () => {
        this.props.changeCursor(index);
    }
}


let mapStateToProps = (state, ownProps) => {
    return {
        weatherList : weatherListSelector(state),
        // TODO
        // cursor : cursorSelector(state)
    }
}

let mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeCursor : (index) => {
            let cursor = index
            dispatch(changeCursor(cursor))
        }
    }
}

let decorator = connect(mapStateToProps, mapDispatchToProps)
let connectedWeatherList = decorator(WeatherList)

export default connectedWeatherList
