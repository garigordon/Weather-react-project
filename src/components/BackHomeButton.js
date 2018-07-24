import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'


class BackHomeButton extends Component {
    render(){
        return <button type="button" onClick={this.handleBack} className="btn btn-info">Back</button>
    }

    handleBack = (e) => {
        e.preventDefault()
        this.props.history.replace('/');
    }
}

let wrappedBackHomeButton = withRouter(BackHomeButton)

export default wrappedBackHomeButton