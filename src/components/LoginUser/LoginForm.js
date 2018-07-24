import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    loginFieldSelector,
    changeLoginField,
    checkAndLoginUser,
    errorLoginFields,
    errorFormStateSelector
}from '../../ducks/authUser'

class LoginForm extends Component{
    onChange = (e) => {
        let {changeLoginField} = this.props
        const { name, value } = e.target;
        changeLoginField(name, value)
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {checkAndLoginUser} = this.props
        const { name, value } = e.target
        checkAndLoginUser(name, value)
    }

    render(){
        const {password, email, error} = this.props
        return(
            <div className="form">
                <h2>Login</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="item">
                        <label htmlFor="Name">Email</label>
                        <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            onChange={this.onChange}
                            value={email}
                        />
                    </div>
                    <div className="item">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={this.onChange}
                            value={password}
                        />
                    </div>
                    <div className="item">
                        <button className="btn btn-info">Login</button>
                    </div>
                    {
                        !!error ? <p>{error}</p> : ""
                    }
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        email : loginFieldSelector(state, "email"),
        password : loginFieldSelector(state, "password"),
        error : errorFormStateSelector(state)
    }
}

const mapDispatchToProps = {
    changeLoginField,
    checkAndLoginUser,
    errorLoginFields
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

