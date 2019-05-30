// 在客户端执行的代码

import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import Routes from '../Routes'
import getStore from '../store/index'

const App = () => {
    return (
        <Provider store={getStore()}>
             <BrowserRouter>
                {Routes}
            </BrowserRouter>
        </Provider>
    )
}

// 用hydrate
ReactDom.hydrate(<App/>, document.getElementById('root'))