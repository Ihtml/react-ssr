import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
// 服务端渲染路由只能用StaticRouter
import { StaticRouter } from 'react-router-dom'
import Routes from '../Routes'

const app = express()
// 只要访问静态文件，就到根目录的public目录下查找
app.use(express.static('public'))

// 访问应用的跟路径，展示一个内容为hello world的html
app.get('/', (req, res) => {
    const content = renderToString((
        // req.path获取用户请求的路径
        <StaticRouter location={req.path} context={{}}>
            {Routes}
        </StaticRouter>
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
}
)

const server = app.listen(3001, () => {
    const host = server.address().address
    const port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
})