import React, {Component} from 'react'
import Slider from "react-slick";
import '../../static/styles/app.css'
import {connect} from 'react-redux'
import {
    weatherListSelector,
    changeCursor,
    cursorSelector
} from '../../ducks/currentWeather'
import WeatherItem from './WeatherItem'


class WeatherList extends Component{
    render(){
        const {weatherList, cursor} = this.props
        const settings = {
            dots: false,
            arrows: true,
            infinite: false,
            speed: 500,
            slidesToShow: 8,
            slidesToScroll: 4,
            className : "some-class-name"
        };
       // console.log('--- weather list props', this.props.item)
        return(
            <div className="list-city">
                <Slider {...settings}>
                    {
                        weatherList.map((item, index) => {
                            return <WeatherItem key={item.dt} cursor={cursor} weather = {item} index={index} handleClick={this.handleClick} />
                        })
                    }
                </Slider>
            </div>
        )
    }

    // TODO move changeCursor to WeatherItem
    handleClick = (index) => () => {
        this.props.changeCursor(index);
    }
}


let mapStateToProps = (state, ownProps) => {
    return {
        weatherList : weatherListSelector(state),
        cursor : cursorSelector(state)
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
