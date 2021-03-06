import React from 'react'
import { renderToString } from 'react-dom/server'
// 服务端渲染路由只能用StaticRouter
import { StaticRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { Helmet } from "react-helmet";

export const render = (store, routes, req, context) => {
    // 服务端渲染时，store里填充什么，需要结合当前用户请求地址和路由做判断
    // 如果访问/路径，就拿home组件的异步数据
    // 如果访问login路径，就拿login组件的异步数据

        //当所有的数据准备好了之后，再生成下面的页面
        const content = renderToString((
            <Provider store={store}>
                {/* req.path获取用户请求的路径 */}
                <StaticRouter location={req.path} context={context}>
                    <div>
                        {renderRoutes(routes)}
                    </div>
                </StaticRouter>
            </Provider>
        ))
        const helmet = Helmet.renderStatic()
        // 如果有样式，就用换行符把它们连接起来
        const cssStr = context.css.length ? context.css.join('\n') : ''
        return `
            <html>
                <head>
                    ${helmet.title.toString()}
                    ${helmet.meta.toString()}
                    ${helmet.link.toString()}
                    <style>${cssStr}</style>
                </head>
                <body>
                    <div id="root">${content}</div>
                    <script>
                            window.context = {
                                state: ${JSON.stringify(store.getState())}
                            }
                    </script>
                    <script src='/index.js'></script>
                </body>
            </html>
        `
}
