import React from 'react'
import { renderToString } from 'react-dom/server'
// 服务端渲染路由只能用StaticRouter
import { StaticRouter, Route } from 'react-router-dom'
// matchPath只能匹配一层路由，matchRoutes可以匹配多层路由
import { matchRoutes } from 'react-router-config'

import { Provider } from 'react-redux'

// now routes is Array
import routes from '../Routes'
import getStore from '../store/index'

export const render = (req,res) => {
    // 服务端渲染时，store里填充什么，需要结合当前用户请求地址和路由做判断
    // 如果访问/路径，就拿home组件的异步数据
    // 如果访问login路径，就拿login组件的异步数据

    const store = getStore()
    const matchedRoutes = matchRoutes(routes, req.path)
    console.log(matchedRoutes)

    const promises = []
    matchedRoutes.forEach(item => {
        // 把store传进组件,这是一个异步函数
        if (item.route.loadData) {
            promises.push(item.route.loadData(store))
        }
    })
    Promise.all(promises).then(() => {
        //当所有的数据准备好了之后，再生成下面的页面
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
        res.send(
        `
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
        ) 
    })
}
