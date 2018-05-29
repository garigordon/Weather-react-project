import React, {Component} from 'react'
import '../static/styles/app.css'
import {fetchWeatherByQuery, fetchWeatherByCoord} from './../helpers'
import {connect} from 'react-redux'
import {
    currentWeatherLoadingStateSelector,
    addCityWeather,
    START_LOADING,
    END_LOADING,
    citySelector,
} from './../ducks/currentWeather'


class Search extends Component{

    constructor(props) {
        super(props)
        this.state = {
            input : "",
            error : "", // TODO view error
            latitude : null,
            longitude : null,
        }
    }

    render() {
        const {isLoading, cityName} = this.props
        if (isLoading) return <div className="container">Loading...</div>
        return (
            <div className="wheather-contatiner container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" value={this.state.input} onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-info">find</button>
                </form>
                <h1>{cityName ? cityName : "No city is chosen"}</h1>
            </div>
        )
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._successGetPosition, this._failGetPosition);
        }
    }

    _successGetPosition = (position) => {
        this.setState({
            latitude : position.coords.latitude,
            longitude : position.coords.longitude,
        }, () => {
            let {latitude, longitude} = this.state
            let {fetchCityWeatherByCoord, endLoading} = this.props
            if (latitude && longitude) {
                let promise = fetchCityWeatherByCoord(latitude, longitude)

                promise
                    .catch((error) => {
                        console.log(error)
                    })
                    .finally(() => {
                        endLoading()
                    })
            }
        })
    }

    _failGetPosition = () => {}

    handleSubmit = (event) => {
        event.preventDefault()
        const {fetchCityWeatherByQuery, endLoading} = this.props
        let promise = fetchCityWeatherByQuery(this.state.input)

        promise
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                this.setState({input : ""})
                endLoading()
            })
        console.log('fetchCityWeatherByQuery return promise: ', promise instanceof Promise)
    }

    handleChange = (event) => this.setState({input : event.target.value})
}


let mapStateToProps = (state, ownProps) => {
    return {
        isLoading : currentWeatherLoadingStateSelector(state),
        cityName : citySelector(state),
    }
}

let mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchCityWeatherByQuery : (query) => {
            dispatch({
                type : START_LOADING,
            })
            return fetchWeatherByQuery(query)
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
        },
        fetchCityWeatherByCoord : (latitude, longtitude) => {
           dispatch({
               type : START_LOADING,
           })
            return fetchWeatherByCoord(latitude, longtitude)
                .then(response => {
                    if (response.status >= 400) throw new Error(response.statusText)
                    return response.json()
                })
                .then(result => {
                    let action = addCityWeather(result)
                    dispatch(action)
                })
        }
    }
}

let decorator = connect(mapStateToProps, mapDispatchToProps)

// console.log("typeof decorator is: ", typeof decorator)

let connectedSearch = decorator(Search)

export default connectedSearch