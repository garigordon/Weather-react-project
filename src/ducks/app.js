// TODO
// add lastCity



import {APP_NAME} from "../settings";

/**
 * Constants
 * */

export const moduleName = 'app'
const prefix = `${APP_NAME}/${moduleName}`

// short description of module is in constants below

export const COUNTER_INCREMENT = `${prefix}/COUNTER_INCREMENT`


/**
 * reducer
 * */

const defaultState = {
    counter : 0
}





const reducer = (state = defaultState, action) => {
    const {type, payload} = action
    switch (type){
        case COUNTER_INCREMENT : {
            return {
                ...state,
                counter: state.counter + 1
            }
            break
        }
        default : {
            return state
            break
        }
    }
}

export default reducer

/**
 * Action creators
 * */

export const addCounterIncrement = () => {
    return {
        type : COUNTER_INCREMENT,
    }
}

