import React from 'react'
import { renderToString } from 'react-dom/server'
// 服务端渲染路由只能用StaticRouter
import { StaticRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import Routes from '../Routes'
import getStore from '../store/index'

export const render = (req) => {
    // 每个用户访问这个页面，render都会重新执行，生成新的store
    const content = renderToString((
        <Provider store={getStore()}>
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
