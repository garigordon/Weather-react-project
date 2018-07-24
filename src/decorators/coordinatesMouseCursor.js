import React, {Component} from 'react'
import {throttle} from '../helpers'

let coordinatesMouseCursor = (SomeComponent) => {
    return class WrappedComponent extends Component{
        state = {
            cursorX: 0,
            cursorY: 0
        };

        componentDidMount(){
            document.addEventListener('mousemove', this.handleMouseMove)
        }

        componentWillUnmount(){
            document.removeEventListener('mousemove', this.handleMouseMove)
        }

        handleMouseMove = throttle(event => {
            this.setState({
                cursorX : event.clientX,
                cursorY : event.clientY
            })
        }, 100)

        render() {
            return <SomeComponent {...this.props} cursorX={this.state.cursorX} cursorY={this.state.cursorY} />
        }
    }
}

export default coordinatesMouseCursor