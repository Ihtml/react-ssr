import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {reducer as headReducer} from '../components/Header/store'
import {reducer as homeReducer} from '../containers/Home/store'
import {reducer as translationReducer} from '../containers/Translation/store'
import clientAxios from '../client/request'
import serverAxios from '../server/request'

const reducer = combineReducers({
    home: homeReducer,
    header: headReducer,
    translation: translationReducer
})
// 每个用户获得不一样的store
export const getStore = (req) => {
    // 如果要变更服务器端的store里的内容，那么一定要使用serverAxios
    return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios(req))))
}

// 为了客户端渲染时，能获得服务端渲染时的store，
export const getClientStore = () => {
    // 如果要变更服务器端的store里的内容，那么一定要使用serverAxios
    const defaultState = window.context.state
    // 把服务器端返回的store，当做reducer的默认值
    return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}
