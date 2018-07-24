import React, {Component} from 'react'
import '../../static/styles/app.css'
import {connect} from 'react-redux'
import {
    handleFetchWeatherByQuery,
} from '../../ducks/currentWeather'


class Search extends Component{

    constructor(props) {
        super(props)
        this.state = {
            input : "",
            error : "", // TODO view error
        }
    }

    render() {
        return (
            <div className="wheather-contatiner container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" value={this.state.input} onChange={this.handleChange}/>
                    </div>
                    <button type="button" onClick={this.handleBack} className="btn btn-info">Back</button>
                    <button type="submit" className="btn btn-info">Find</button>
                </form>
            </div>
        )
    }
    handleBack = (e) => {
        e.preventDefault()
        this.props.history.push('/');
    }


    handleSubmit = (event) => {
        event.preventDefault()
        const {handleFetchWeatherByQuery} = this.props
        handleFetchWeatherByQuery(this.state.input)
        this.setState({input : ""})
    }

    handleChange = (event) => this.setState({input : event.target.value})
}

// let mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         dispatchHanldeFetchWeatherByQuery : (...args) => {
//             dispatch(handleFetchWeatherByQuery(...args))
//         },
//         dispatchHandelFetchWeatherByCoord : (...args) => {
//            dispatch(handelFetchWeatherByCoord(...args))
//         },
//     }
// }

// let mapDispatchToProps = {
//     dispatchHanldeFetchWeatherByQuery : handleFetchWeatherByQuery,
//     dispatchHandelFetchWeatherByCoord : handelFetchWeatherByCoord,
// }

let mapDispatchToProps = {
    handleFetchWeatherByQuery,
}

let decorator = connect(null, mapDispatchToProps)

// console.log("typeof decorator is: ", typeof decorator)

let connectedSearch = decorator(Search)


export default connectedSearch