// 在客户端执行的代码

import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import Routes from '../Routes'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const reducer = (state = {name: 'IFE'}, action) => {
    return state
}
const store = createStore(reducer)

const App = () => {
    return (
        <Provider store={store}>
             <BrowserRouter>
                {Routes}
            </BrowserRouter>
        </Provider>
    )
}

// 用hydrate
ReactDom.hydrate(<App/>, document.getElementById('root'))