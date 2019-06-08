import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {reducer as homeReducer} from '../containers/Home/store'

const reducer = combineReducers({
    home: homeReducer
})
// 每个用户获得不一样的store
export const getStore = () => {
    return createStore(reducer, applyMiddleware(thunk))
}

// 为了客户端渲染时，能获得服务端渲染时的store，
export const getClientStore = () => {
    const defaultState = window.context.state
    // 把服务器端返回的store，当做reducer的默认值
    return createStore(reducer, defaultState, applyMiddleware(thunk))
}
