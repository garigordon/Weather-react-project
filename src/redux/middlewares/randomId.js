let randomId = function(store) {
    return function(next) {
        return function(action) {
            if (action.payload && action.payload.randomId) {
                action = {
                    ...action,
                    payload : {
                        ...action.payload,
                        randomId : (Date.now() + Math.random()).toString()
                    }
                }
            }
            next(action)
        }
    }
}

// redux
// randomId(store)(next)(action)

// let _r = store => next => action => {
//
// }

export default randomId