import React, {Component} from 'react'
import '../static/styles/app.css'
import Search from './Search'
import WeatherList from './WeatherList'

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Search/>
                <WeatherList/>
            </div>
        )
    }
}


export default App
