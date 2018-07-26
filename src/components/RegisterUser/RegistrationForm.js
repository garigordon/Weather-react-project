import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    registerFieldSelector,
    changeRegisterField,
    checkAndRegisterUser,
    errorRegisterFormStateSelector
} from '../../ducks/authUser'

class RegisterForm extends Component{

    onSubmit = (e) => {
        e.preventDefault();
        const {checkAndRegisterUser} = this.props
        checkAndRegisterUser()
    }

    onChange = (e) => {
        let {changeRegisterField} = this.props
        const { name, value } = e.target;
        changeRegisterField(name, value)
    }

    render() {
        const {email, password, name, error} = this.props
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
                    {
                        !!error ? <p>{error}</p> : ""
                    }
                </form>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        name : registerFieldSelector(state, "name"),
        email : registerFieldSelector(state, "email"),
        password : registerFieldSelector(state, "password"),
        error : errorRegisterFormStateSelector(state, "error")
    }
}

const mapDispatchToProps = {
    changeRegisterField,
    checkAndRegisterUser
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
