const loggerAc = store => next => action => {
    next(action)
}

export default loggerAc