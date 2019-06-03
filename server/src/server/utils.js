import React from 'react'
import { renderToString } from 'react-dom/server'
// 服务端渲染路由只能用StaticRouter
import { StaticRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

// now routes is Array
import routes from '../Routes'
import getStore from '../store/index'

export const render = (req) => {
    // 服务端渲染时，store里填充什么，需要结合当前用户请求地址和路由做判断
    // 如果访问/路径，就拿home组件的异步数据
    // 如果访问login路径，就拿login组件的异步数据

    const store = getStore()


    // 每个用户访问这个页面，render都会重新执行，生成新的store
    const content = renderToString((
        <Provider store={store}>
            {/* req.path获取用户请求的路径 */}
            <StaticRouter location={req.path} context={{}}>
                <div>
                    {/* {Routes} */}
                    {routes.map(route => (
                        <Route {...route} />
                    ))}
                </div>
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
