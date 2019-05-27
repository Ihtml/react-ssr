import React from 'react'
import { renderToString } from 'react-dom/server'
// 服务端渲染路由只能用StaticRouter
import { StaticRouter } from 'react-router-dom'
import Routes from '../Routes'

export const render = (req) => {
    const content = renderToString((
        // req.path获取用户请求的路径
        <StaticRouter location={req.path} context={{}}>
            {Routes}
        </StaticRouter>
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
