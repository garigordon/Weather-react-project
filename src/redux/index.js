import {createStore} from 'redux'
import reducer from './reducer'


const store = createStore(reducer)

// TODO dev only
window.store = store

export default store