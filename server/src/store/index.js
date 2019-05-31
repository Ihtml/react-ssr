import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {reducer as homeReducer} from '../containers/Home/store'

const reducer = combineReducers({
    home: homeReducer
})
// 每个用户获得不一样的store
const getStore = () => {
    return createStore(reducer, applyMiddleware(thunk))
}

export default getStore