// 在客户端执行的代码

import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from '../Routes'
import {getClientStore} from '../store/index'

const store = getClientStore()
const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    {routes.map(route => (
                        <Route {...route} />
                    ))}
                </div>
            </BrowserRouter>
        </Provider>
    )
}

// 用hydrate
ReactDom.hydrate(<App />, document.getElementById('root'))