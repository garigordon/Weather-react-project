import React, {Component} from 'react'


let toggleOpen = (SomeComponent) => {
    return class WrappedComponent extends Component {

        state = {
            isOpen : true,
        }

        toggleOpen = () => {
            this.setState({isOpen : !this.state.isOpen})
        }

        render() {
            return <SomeComponent {...this.props} isOpen = {this.state.isOpen} toggleOpen={this.toggleOpen} />
        }
    }
}

export default toggleOpen