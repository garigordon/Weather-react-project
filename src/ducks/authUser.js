// TODO

// const, reducer (case), action creator, selector for register errors
// const, reducer (case), action creator, selector for login errors



import {APP_NAME} from '../settings'

/**
 * Constants
 * */
export const moduleName = 'userLogin'
const prefix = `${APP_NAME}/${moduleName}`
export const CHANGE_REGISTER_FIELD = `${prefix}/CHANGE_REGISTER_FIELD`
export const RESET_REGISTER_FIELDS_STATE = `${prefix}/RESET_REGISTER_FIELDS_STATE`
export const CHANGE_REGISTER_FORM_STATE = `${prefix}/CHANGE_REGISTER_FORM_STATE`
export const CHANGE_LOGIN_FIELD = `${prefix}/CHANGE_LOGIN_FIELD`
export const RESET_LOGIN_FIELDS_STATE = `${prefix}/RESET_LOGIN_FIELDS_STATE`
export const CHANGE_LOGIN_FORM_STATE = `${prefix}/CHANGE_LOGIN_FORM_STATE`
export const SAVE_LOGIN_FORM_STATE =  `${prefix}/SAVE_LOGIN_FORM_STATE`
export const ERROR_LOGIN_FORM_STATE =  `${prefix}/ERROR_LOGIN_FORM_STATE`
export const ERROR_REGISTER_FORM_STATE =  `${prefix}/ERROR_REGISTER_FORM_STATE`
export const SAVE_AUTH_USER =  `${prefix}/SAVE_AUTH_USER`

/**
 * reducer
 * */
const defaultRegisterFields = {
    name : '',
    password : '',
    email : ''
}

const defaultRegister = {
    fields : defaultRegisterFields,
    formState : {
        isTouched : false,
        error : "",
    }
}
const defaultLoginFields = {
    email : "",
    password : "",
}

const defaultLogin = {
    fields : defaultLoginFields,
    formState : {
        isTouched : false,
        error : "",
    }
}

const defaultAuthedUser = {
    //id : null,
    email : "",
    name : "",
    //auth_token : null,
}

const defaultState = {
    register : defaultRegister,
    login : defaultLogin,
    authedUser : defaultAuthedUser,
}


const reducer = (state = defaultState, action) => {
    const {type, payload} = action

    switch (type) {
        case RESET_REGISTER_FIELDS_STATE : {
            return {
                ...state,
                register : {
                    ...state.register,
                    fields : defaultRegisterFields
                }
            }
            break
        }
        case CHANGE_REGISTER_FIELD : {
            //let {fieldName, fieldValue}errorLoginFields = payload
            let fieldName = payload.fieldName
            let fieldValue = payload.fieldValue
            return {
                ...state,
                register : {
                    ...state.register,
                    fields : {
                        ...state.register.fields,
                        [fieldName] : fieldValue,
                    }
                }
            }
            break
        }
        case CHANGE_REGISTER_FORM_STATE : {
            let {isTouched} = payload
            return {
                ...state,
                register : {
                    ...state.register,
                    formState : {
                        ...state.register.formState,
                        isTouched : isTouched
                    }
                }
            }
            break
        }
        case CHANGE_LOGIN_FIELD : {
            let {fieldName, fieldValue} = payload
            return {
                ...state,
                login : {
                    ...state.login,
                    fields : {
                        ...state.login.fields,
                        [fieldName] : fieldValue,
                    }
                }
            }
            break
        }
        case CHANGE_LOGIN_FORM_STATE : {
            let {isTouched} = payload
            return {
                ...state,
                login : {
                    ...state.login,
                    formState : {
                        ...state.login.formState,
                        isTouched : isTouched
                    }
                }
            }
            break
        }
        case RESET_LOGIN_FIELDS_STATE : {
            return {
                ...state,
                login : {
                    ...state.login,
                    fields : defaultLoginFields
                }
            }
            break
        }
        case SAVE_LOGIN_FORM_STATE : {
            let {fieldName, fieldValue} = payload
            return {
                ...state,
                authedUser : {
                    ...state.authedUser,
                    [fieldName] : fieldValue,
                }
            }
            break
        }
        case SAVE_AUTH_USER : {
            let {changeData = []} = payload
            let authedUser = {}
            changeData.forEach(chd => {
                let {key, value} = chd
                authedUser = {
                    ...authedUser,
                    [key] : value,
                }
            })
            return {
                ...state,
                authedUser : {
                    ...state.authedUser,
                    ...authedUser
                }
            }
            break
        }
        case ERROR_LOGIN_FORM_STATE : {
            let error = payload.error
            // let {error} = payload
            return {
                ...state,
                login : {
                    ...state.login,
                    formState : {
                        ...state.login.formState,
                        error : error
                    }
                }
            }
            break
        }
        case ERROR_REGISTER_FORM_STATE : {
            let error = payload.error
            return {
                ...state,
                register : {
                    ...state.register,
                    formState : {
                        ...state.register.formState,
                        error : error
                    }
                }
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
export const registerFieldSelector = (state, fieldName) => {
    return state[moduleName].register.fields[fieldName]
}

export const loginFieldSelector = (state, fieldName) => {
    return state[moduleName].login.fields[fieldName]
}

export const errorFormStateSelector = (state) => {
    return state[moduleName].login.formState.error
}


export const errorRegisterFormStateSelector = (state) => {
    return state[moduleName].register.formState.error
}

/**
 * Action creators
 * */
export const changeRegisterField = (fieldName, fieldValue) => {
    return {
        type : CHANGE_REGISTER_FIELD,
        payload : {
            fieldName : fieldName,
            fieldValue : fieldValue
        }
    }
}

export const resetRegisterFields = () => {
    return {
        type : RESET_REGISTER_FIELDS_STATE
    }
}

export const changeLoginField = (fieldName, fieldValue) => {
    return {
        type : CHANGE_LOGIN_FIELD,
        payload : {
            fieldName : fieldName,
            fieldValue : fieldValue
        }
    }
}

export const resetLoginFields = () => {
    return {
        type : RESET_LOGIN_FIELDS_STATE,
    }
}

export const saveLoginFields = (fieldName, fieldValue) => {
    return {
        type : SAVE_LOGIN_FORM_STATE,
        payload : {
            fieldName : fieldName,
            fieldValue : fieldValue
        }
    }
}

export const errorLoginFields = (text) => {
    return {
        type : ERROR_LOGIN_FORM_STATE,
        payload : {
            error : text,
        }
    }
}

export const errorRegisterFilelds = (text) => {
    return {
        type : ERROR_REGISTER_FORM_STATE,
        payload : {
            error : text,
        }
    }
}
/*
{
    type : "test-weather/authUser/ERROR_LOGIN_FORM_STATE",
    payload : {
        error : 'Validation fail'
    }
}
* */

export const saveAuthUser = changeData => {
    return {
        type : SAVE_AUTH_USER,
        payload : {
            changeData : changeData
        }
    }
}

/**
 * Thunk
 * */

export const checkAndRegisterUser = () => {
    return (dispatch, getState) => {
        // check user
        let state = getState()
        let name = registerFieldSelector(state, "name")
        let password = registerFieldSelector(state, "password")
        let email = registerFieldSelector(state, "email")

        /*
            fetch("users/register", {
                "method" : "POST",
                body : {
                    email,
                    name,
                    password,
                }
            })
            .then(response => {
                if (response.statusCode < 400) throw new Exception(response.statusText)
                else return response.json()
            })
            .then(result => {
                dispatch(someAction) // for example change app.auth = true and save to redux store result
            })
            .catch(error => {
                console.warn(error)
            })
        */


        if (!_checkRegisterEmpty({name, password, email})) {
            dispatch(errorRegisterFilelds("Fill all register input fields"))
            return
        }

        if (!_checkRegisterHasSuchEmail({email})) {
            dispatch(errorRegisterFilelds("User with such email already exists"))
            return
        }

        let users
        try {
            users = JSON.parse(localStorage.getItem(`${APP_NAME}-users`))
            if (!Array.isArray(users)){
                users = []
            }
        } catch (e) {
            users = []
        }

        let user = { // registered user
            name,
            password,
            email,
        }

        users = [
            ...users,
            {
                ...user
            }
        ]

        localStorage.setItem(`${APP_NAME}-users`, JSON.stringify(users))

        let authUser = users.find((user) => {
            if(user.email === email && user.password === password){
                return true
            }
        })

        dispatch(resetRegisterFields())
        dispatch(saveAuthUser([
            {
                key : "email",
                value : authUser.email,
            },
            {
                key : "name",
                value : authUser.name,
            }
        ]))
    }
}

const _checkRegisterEmpty = params => {
    let {name, password, email} = params
    if(name === "" || password === "" || email === ""){ // if (!name || !password || !email) {
        return false
    }else {
        return true
    }
}

const _checkRegisterHasSuchEmail = params => {
    let {email} = params
    let users
    try {
        users = JSON.parse(localStorage.getItem(`${APP_NAME}-users`))
        if (!Array.isArray(users)){
            users = []
        }
    } catch (e) {
        users = []
    }

    let hasSuchEmail = users.some((user) => {
        if (user.email === email){
            return true
        }
    })
    if(hasSuchEmail){
        return false
    }
}

export const checkAndLoginUser = params => (dispatch, getState) => {
    let state = getState()
    let password = loginFieldSelector(state, "password")
    let email = loginFieldSelector(state, "email")
    if (!_checkLoginEmpty({email, password})) {
        dispatch(errorLoginFields("Fill all input fields"))
        return
    }

    if (!_checkLoginPasswordMatch({email, password})) {
        dispatch(errorLoginFields("Login or password aren't correct"))
        return
    }

    dispatch(errorLoginFields(""))
    /*
    * imagine, that this is a backend
    * */
    let users
    try {
        users = JSON.parse(localStorage.getItem(`${APP_NAME}-users`))
        if (!Array.isArray(users)){
            users = []
        }
    } catch (e) {
        users = []
    }
    let authUser = users.find((user) => {
        if(user.email === email && user.password === password){
            return true
        }
    })
    /**/

    if (authUser) {
        dispatch(resetLoginFields())
        dispatch(saveAuthUser([
            {
                key : "email",
                value : authUser.email,
            },
            {
                key : "name",
                value : authUser.name,
            }
        ]))
    }
}

const _checkLoginEmpty = (params) => {
    let {password, email} = params
    if(!email || !password){
        return false
    }else {
        return true
    }
}

const _checkLoginPasswordMatch = (params) => {
    /*
    * imagine, that this is a backend
    * */
    let users
    try {
        users = JSON.parse(localStorage.getItem(`${APP_NAME}-users`))
        if (!Array.isArray(users)){
            users = []
        }
    } catch (e) {
        users = []
    }
    let {password, email} = params
    let hasSuchLogin = users.some((user) => {
        if (user.email === email && user.password === password){
            return true
        }
    })
    /**/

    if(!hasSuchLogin){
        return false
    }
    return true
}