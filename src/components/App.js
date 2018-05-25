import React, {Component} from 'react'
import '../static/styles/app.css'
import Search from './Search'


class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <Search/>
                </div>
            </div>
        )
    }
}


export default App
