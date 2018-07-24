// TODO get register errors from redux store
// if there is any register error display them


import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    registerFieldSelector,
    changeRegisterField,
    checkAndRegisterUser
} from '../../ducks/authUser'

class RegisterForm extends Component{

    onSubmit = (e) => {
        e.preventDefault();
        //const {userLogin} = this.props
        //userLogin(this.state.email)
        //userLogin(this.state.password)
        const {checkAndRegisterUser} = this.props
        checkAndRegisterUser()

        /*this.props.login(this.state).then(
            (res) => this.context.router.push('/'),
            (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
        );*/

    }

    onChange = (e) => {
        let {changeRegisterField} = this.props
        const { name, value } = e.target;
        changeRegisterField(name, value)
    }

    render() {
        const {email, password, name} = this.props
        return(
            <div className="form">
                <h2>Registration</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="item">
                        <label htmlFor="Name">Name</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Name"
                            onChange={this.onChange}
                            value={name}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="Email">Email</label>
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
                        <button className="btn btn-info">Registration</button>
                    </div>
                </form>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        name : registerFieldSelector(state, "name"),
        email : registerFieldSelector(state, "email"), // TODO rename selector to login
        password : registerFieldSelector(state, "password"),
    }
}

const mapDispatchToProps = {
    changeRegisterField, // TODO rename selector to login
    checkAndRegisterUser
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
