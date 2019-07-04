import {CHANGE_LOGIN} from './constants'

const changeLogin = (value) => ({
    type: CHANGE_LOGIN,
    value
})
export const getHeaderInfo = () => {
    // 使用redux-thunk后，如果返回的是函数，会接收dispatch方法做参数
    return (dispatch, getState, axiosInstance) => {
        return axiosInstance.get('/api/isLogin.json').then((res) => {
            // dispatch(changeLogin(res.data.data.login))
            dispatch(changeLogin(res.data.data.login))
        })
    }
}

export const login = () => {
    return (dispatch, getState, axiosInstance) => {
        // 登录接口
        return axiosInstance.get('/api/login.json').then((res) => {
            dispatch(changeLogin(true))
        })
    }
}

export const logout = () => {
    return (dispatch, getState, axiosInstance) => {
        // 登录接口
        return axiosInstance.get('/api/logout.json').then((res) => {
            dispatch(changeLogin(false))
        })
    }
}