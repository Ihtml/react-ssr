import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const reducer = (state = {name: 'IFE'}, action) => {
    return state
}

// 每个用户获得不一样的store
const getStore = () => {
    return createStore(reducer, applyMiddleware(thunk))
}

export default getStore