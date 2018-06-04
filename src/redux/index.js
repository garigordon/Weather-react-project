import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import randomId from './middlewares/randomId'
import loggerAc from './middlewares/logger'
import actionsCounter from './middlewares/actionsCounter'

const enhancer = applyMiddleware(randomId, loggerAc, actionsCounter)

const store = createStore(reducer, enhancer)

// TODO dev only
window.store = store

export default store