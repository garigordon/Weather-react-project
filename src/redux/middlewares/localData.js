import {SET_LAST_CITY} from '../../ducks/app'
import {APP_NAME} from '../../settings'

const localData = store => next => action => {
    if (action.type === SET_LAST_CITY){
        localStorage.setItem(`${APP_NAME}-city`, JSON.stringify(action.payload.lastCity))
    }
    next(action)
}

export default localData