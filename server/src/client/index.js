// 在客户端执行的代码

import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import Routes from '../Routes'

const App = () => {
    return (
        <BrowserRouter>
            {Routes}
        </BrowserRouter>
    )
}

// 用hydrate
ReactDom.hydrate(<App/>, document.getElementById('root'))