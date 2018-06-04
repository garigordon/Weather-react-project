const loggerAc = store => next => action => {
    console.log(action)
    next(action)
}

export default loggerAc