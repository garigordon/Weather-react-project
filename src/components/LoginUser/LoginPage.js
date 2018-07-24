import React, {Component} from 'react'
import LoginForm from './LoginForm'

class LoginPage extends Component{
    render() {
        return(
            <div className="container">
                <h1>Login page</h1>
                <LoginForm/>
            </div>

        )
    }
}

export default LoginPage;