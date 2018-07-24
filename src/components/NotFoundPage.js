import React, {Component} from 'react'
import coordinatesMouseCursor from '../decorators/coordinatesMouseCursor'
import BackHomeButton from './BackHomeButton'


class NotFoundPage extends Component{
    render() {
        return(
            <div>
                <h1>Nothing found</h1>
                <BackHomeButton />
                <div className="mouse">
                    ({this.props.cursorX}, {this.props.cursorY})
                </div>
            </div>

        )
    }
}

let wrappedNotFoundPage =  coordinatesMouseCursor(NotFoundPage)

export default wrappedNotFoundPage