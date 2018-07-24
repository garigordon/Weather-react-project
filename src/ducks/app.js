import {APP_NAME} from "../settings";

/**
 * Constants
 * */

export const moduleName = 'app'
const prefix = `${APP_NAME}/${moduleName}`

// short description of module is in constants below

export const COUNTER_INCREMENT = `${prefix}/COUNTER_INCREMENT`
export const SET_LAST_CITY = `${prefix}/SET_LAST_CITY`
export const INIT_LOAD_APP = `${prefix}/INIT_LOAD_APP`
export const START_LOADING = `${prefix}/START_LOADING`
export const END_LOADING = `${prefix}/END_LOADING`

/**
 * reducer
 * */

const defaultState = {
    counter : 0,
    lastCity : null,
    appIsInited : false
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
        case SET_LAST_CITY : {
            const {lastCity} = payload
            return{
                ...state,
                lastCity,
            }
            break
        }
        case INIT_LOAD_APP : {
            const {appIsInited} = payload
            return{
                ...state,
                appIsInited
            }
            break
        }
        case START_LOADING : {
            return {
                ...state,
                loading : true,
            }
            break
        }
        case END_LOADING : {
            return {
                ...state,
                loading : false,
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
 * Selectors
 * */

export const lastCitySelector = state => {
    return state[moduleName].lastCity
}

export const initAppSelector = state => {
    return state[moduleName].appIsInited
}



/**
 * Action creators
 * */

export const addCounterIncrement = () => {
    return {
        type : COUNTER_INCREMENT,
    }
}

export const addLastCity = lastCity => {
    return {
        type : SET_LAST_CITY,
        payload : {
            lastCity, // lastCity : lastCity
        }
    }
}

export const addInitedApp = appIsInited => {
    return {
        type : INIT_LOAD_APP,
        payload : {
            appIsInited,
        }
    }
}


/**
 * Thunk
 * */

export const checkAndInitApp = () => {
    return (dispatch, getState) => {
        let state = getState()
        let initApp = initAppSelector(state)
        if(initApp){
            return
        }else {
            let lastCity
            try {
                lastCity = JSON.parse(localStorage.getItem(`${APP_NAME}-city`))
            } catch (e) { lastCity = null }
            dispatch(addLastCity(lastCity))
            dispatch(addInitedApp(true))
        }
    }
}