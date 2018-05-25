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

import WeatherList from './weatherList'

class Search extends Component{
    state = {
        input : "",
        error : "", // TODO view error
    }
    render() {
        // console.log('props of the App', this.props)
        // console.log(this.props);
        const {isLoading, cityName, listCity, weatherList} = this.props
        if (isLoading) return <div className="container">Loading...</div>
        //console.log(listCity);
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" value={this.state.input} onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-info">find</button>
                </form>
                <h1>{cityName ? cityName : "No city is chosen"}</h1>
                <WeatherList/>
            </div>
        )
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {fetchCityWeather, endLoading} = this.props
        let promise = fetchCityWeather(this.state.input)
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                this.setState({input : ""})
                endLoading()
            })
        console.log('fetchCityWeather return promise: ', promise instanceof Promise)
    }

    handleChange = (event) => this.setState({input : event.target.value})
}


let mapStateToProps = (state, ownProps) => {
    return {
        isLoading : currentWeatherLoadingStateSelector(state),
        cityName : citySelector(state),
        weatherList : weatherListSelector(state),
    }
}

let mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchCityWeather : (query) => {
            dispatch({
                type : START_LOADING,
            })
            return appFetch(query)
                .then(response => {
                    if (response.status >= 400) throw new Error(response.statusText)
                    return response.json()
                })
                .then(result => {
                    let action = addCityWeather(result)
                    dispatch(action)
                })
        },
        endLoading : () => {
            dispatch({
                type : END_LOADING,
            })
        }
    }
}

let decorator = connect(mapStateToProps, mapDispatchToProps)

// console.log("typeof decorator is: ", typeof decorator)

let connectedSearch = decorator(Search)

export default connectedSearch