import React, {Component} from 'react'
import '../static/styles/app.css'
import Search from './Search'
import WeatherList from './WeatherList'
import ChosenWeather from './ChosenWeather'


class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Search/>
                <ChosenWeather />
                <WeatherList/>
            </div>
        )
    }
}

export default App
