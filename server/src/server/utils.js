import React from 'react'
import { renderToString } from 'react-dom/server'
// 服务端渲染路由只能用StaticRouter
import { StaticRouter } from 'react-router-dom'
import Routes from '../Routes'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

export const render = (req) => {

    const reducer = (state = {name: 'IFE'}, action) => {
        return state
    }
    const store = createStore(reducer, applyMiddleware(thunk))

    const content = renderToString((
        <Provider store={store}>
            {/* req.path获取用户请求的路径 */}
            <StaticRouter location={req.path} context={{}}>
                {Routes}
            </StaticRouter>
        </Provider>
    ))
    return `
    <html>
        <head>
            <title>react ssr</title>
        </head>
        <body>
            <div id="root">${content}</div>
            <script src='/index.js'></script>
        </body>
    </html>
    `
}
