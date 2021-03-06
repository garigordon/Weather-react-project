import {addCounterIncrement, COUNTER_INCREMENT} from '../../ducks/app'

const actionsCounter = ({dispatch}) => next => action => {
    // let {dispatch} = store
    if (action.type !== COUNTER_INCREMENT){
        dispatch(addCounterIncrement())
    }
    next(action)
}

export default actionsCounter