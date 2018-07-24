import React, {Component} from 'react'
import cn from "classnames"
import {getIconSrc, parseTime} from '../../helpers/index'
import toggleOpen from '../../decorators/toggleOpen'


class WeatherItem extends Component {
    render() {
        let {weather : weatherItemData, cursor, index, isOpen, toggleOpen, handleClick} = this.props
        // console.log('--- weather weather props', this.props)
        let {dt_txt, main, weather} = weatherItemData
        let {temp} = main
        let {description, icon} = weather[0] || {}
        /* console.log('--- list item', item)*/

        let _moment = parseTime(dt_txt)
        let momentDate = _moment.format("ddd DD")
        let momentTime = _moment.format("HH : mm")

        let isActive
        if(cursor === index){
            isActive = true
        }
        // let isActive = cursor === index

        if (!isOpen) return <div onClick={toggleOpen}>Open item</div>

        return [
            <div key={1} onClick={toggleOpen}>Close item</div>,
            <div key={2} onClick={handleClick(index)} className={cn({
                "active" : isActive, // TODO styles for isActive
            })}>
                <p className="datetime">{momentDate}</p>
                <p className="datetime">{momentTime}</p>
                <div className="cloudness-icon">
                    <img src={getIconSrc(icon)} alt=""/>
                </div>
                <p className="temprature">{Math.floor(temp)} <span className="temprature-unit">°C</span></p>
                <p className="cloudness-text">{description}</p>
            </div>
        ]
    }
}

let wrappedWeatherItem = toggleOpen(WeatherItem)

export default wrappedWeatherItem