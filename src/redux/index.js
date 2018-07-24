import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import randomId from './middlewares/randomId'
import loggerAc from './middlewares/logger'
import actionsCounter from './middlewares/actionsCounter'
import localData from './middlewares/localData'
import {routerMiddleware} from 'react-router-redux'
import history from './../history'


let routerMiddleWareWithHistory = routerMiddleware(history)

const enhancer = applyMiddleware(thunk, routerMiddleWareWithHistory, randomId, loggerAc, actionsCounter, localData)

const store = createStore(reducer, enhancer)

// TODO dev only
window.store = store

export default store