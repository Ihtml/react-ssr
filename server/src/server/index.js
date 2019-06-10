import express from 'express'
import {render} from './utils'
import {getStore} from '../store/index'
// now routes is Array
import routes from '../Routes'
// matchPath只能匹配一层路由，matchRoutes可以匹配多层路由
import { matchRoutes } from 'react-router-config'
import proxy from 'express-http-proxy'

const app = express()
// 只要访问静态文件，就到根目录的public目录下查找
app.use(express.static('public'))

// 当接收到api开头的请求，代理到https://www.apiopen.top上
app.use('/api', proxy('https://www.apiopen.top', {
    // 拼接https://www.apiopen.top + req.url
    proxyReqPathResolver: function(req) {
        return req.url
    }
}));

// 访问应用的跟路径，展示一个内容为hello world的html
app.get('*', (req, res) => {
    const store = getStore()
    const matchedRoutes = matchRoutes(routes, req.path)

    const promises = []
    matchedRoutes.forEach(item => {
        // 把store传进组件,这是一个异步函数
        if (item.route.loadData) {
            promises.push(item.route.loadData(store))
        }
    })
    // console.log(matchedRoutes)

    Promise.all(promises).then(() => {
        res.send(render(store, routes, req))
    })
})

const server = app.listen(3001, () => {
    const host = server.address().address
    const port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
})