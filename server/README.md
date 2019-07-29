目录结构：      

.       

├── README.md       

├── build       

│   └── bundle.js       

├── package-lock.json       

├── package.json        

├── src     

│   ├── App.js      

│   ├── Routes.js       

│   ├── client      

│   ├── components      

│   ├── config.js       

│   ├── containers      

│   ├── server      

│   ├── store       

│   └── withStyle.js        

├── tree.md     

├── webpack.base.js     

├── webpack.client.js       

└── webpack.server.js       



## 服务端渲染和客户端渲染的区别

1. 用`create-react-app`创建一个网页应用，如果打开它的网页源代码，会发现只有一个空的，id为`root`的div元素。而页面的实际内容，是**由js文件渲染出来的**。如果在网站设置里，禁止掉JavaScript，页面上什么都不会输出了。这就是**客户端渲染**。

2. 传统react的单页应用，它的页面内容（HTML），并不是服务器返回来的，内容是通过加载js文件，js向页面渲染内容。而**服务端渲染**是：页面上的内容，在服务器上就已经生成好了，服务器把内容给到浏览器，浏览器把内容直接显示出来。服务端渲染后的网页，源代码是有内容的。

3. react客户端渲染的优势和弊端：

   **优势**：前端负责页面的渲染，数据来源于向后端发送ajax请求，后端把数据通过json的形式返回给前端，前端再渲染。实现前后端分离的架构。有利于团队开发。

   **劣势**：返回给浏览器的HTML没有实际内容，需要下载js文件，运行js的内容后，页面才展示出来。

4. 为什么要使用服务端渲染

   1. 用户访问一个网址的时候，看到页面的过程相对ssr的速度要慢一些，首屏加载速度慢，而服务端渲染因为内容是服务器直接返回的，所以**首屏速度快**。
   2. **SEO**，如果希望网站排名靠前，一定需要服务器端渲染。客户端渲染的HTML里是没有内容的，内容靠加载的js文件渲染出来。而百度的搜索引擎爬虫，只认识HTML里的内容，不认识js里的内容。

## React服务端渲染原理

1. react ssr是建立在**虚拟DOM**上的，客户端渲染的时候，把虚拟DOM这个对象转换成真实的DOM，而服务端渲染把它转换成字符串返回给浏览器。

2. 在 SSR 中有一個非常重要的概念，只有使用者第一次进來该页面时是通过 Renderer Server 处理（SSR），除此之外，后来操作的行为和页面的切换，则是客户端加载的js文件处理。

3.  ReactDOM 中提供了 `renderToString()` 的方法，将react组件转换为字符串随浏览器返回。但**服务器端没有DOM，不支持事件（onclick）处理**。服务端渲染renderToString方法不会把事件渲染出来。只会渲染组件的基础内容。所以需要客户端实现同样的代码，单独打包，然后服务端直接引入。

   这个过程称为**同构**：一套react代码，在服务器端执行一次，在客户端再执行一次。

## React服务端渲染实现

1. **webpack服务端配置**：

   ```js
   const path = require('path')
   const nodeExternals = require('webpack-node-externals')
   const merge = require('webpack-merge')
   const config = require('./webpack.base.js')
   
   const serverConfig = {
   ​    // 当前环境为node环境
   ​    target: 'node',
   ​    mode: 'development',
   ​    entry: './src/server/index.js',
   ​    output: {
   ​        filename: 'bundle.js',
   ​        path: path.resolve(__dirname, 'build')
   ​    },
   ​    externals: [nodeExternals()],
   ​    module: {
   ​        rules: [{
   ​            test: /.css?$/,
   ​            use: ['isomorphic-style-loader', {
   ​                loader: 'css-loader',
   ​                options: {
   ​                    importLoaders: 1, //接下来要执行loader的数目
   ​                    modules: {
   ​                        localIdentName: '[name]_[local]_[hash:base64:5]'
   ​                    }
   ​                }
   ​            }]
   ​        }]
   ​    }
   }
   
   module.exports = merge(config, serverConfig)
   ```

   `webpack-node-externals`用于排除node本身自带的模块打包，因为服务端环境就是node

   `isomorphic-style-loader`解析CSS，发现CSS中有某个class组件中引用了，就会在渲染页面的时候把这个class加到HTML的字符串里

2. **添加服务端渲染的入口文件`src/server/index.js**`

   ![](https://raw.githubusercontent.com/Ihtml/images/master/img/20190724233204.jpg)

   服务器端用**StaticRouter**，**把用户请求的路径传递给StaticRouter，才知道当前所处的位置**，需要传入一个location,使用**context**对象做数据通讯获取。

   创建一个Routes.js文件用于匹配路由。

3. **ssr与redux结合**

   与客户端渲染不同的是，在服务端，每次接收到请求都要重新创建一个store。

   ![](https://raw.githubusercontent.com/Ihtml/images/master/img/20190726224332.jpg)

   另外需要注意的是：在客户端，我们一般在componentDidMount的时候发送ajax请求，但 **componentDidMount只会在客户端渲染的时候执行，不会在服务器端执行**，因为服务端没有DOM。

   因此本应在componentDidMount发起的ajax请求，在服务端永远不会被发起。

   流程分析：

   1. 服务器接收到请求，这是store是空的，所以什么内容都没有，

   2. **componentDidMount()在服务器端一直不执行，所以列表内容获取不到**

   3. 浏览器会加载index.js，客户端代码会再执行一遍，BrowserRouter会知道当前路由要显示哪个组件，组件的代码又会在客户端执行一次，当前store仍然是空的

   4. componentDidMount()执行，调用方法，列表数据被获取

   5. store中的列表数据被更新

   6. 客户端渲染出store中list数据对应的内容

4. **服务端渲染获取数据**

   服务器接收到页面请求后，在服务端就发送ajax请求,获取该页面渲染所需要的数据，再返回给浏览器。这样服务器返回的页面就有内容了，首屏速度更快。

   做法：

   1. 配置Routes.js路由文件，导出一个路由对象数组,对应每个路径下需要的组件。如果加载组件之前要发送ajax请求获取数据，那就给路由对象添加一个**loadData**方法，这个方法是在组件上定义的，它接收store，派发异步请求的action。

      ```js
      import React from 'react'
      import Home from './containers/Home'
      import Login from './containers/Login'
      import Translation from './containers/Translation'
      import NotFound from './containers/NotFound'
      import App from './App'
      
      export default  [
          {
            path: "/",
            // 只要目录结构里带‘/’根路径，就显示App
            component: App,
            loadData: App.loadData,
            routes: [
              {
                path: "/",
                component: Home,
                // 精确匹配
                exact: true,
                // 加载HOme组件之前要执行的方法,
                loadData: Home.loadData,
                key: 'home',
                routes: [{
                  path: '/test',
                  component: Login,
                  exact: true,
                  key: 'test'
                }]
              },
              {
                  //直接展示login组件，不需要加载任何的数据，不需要loadData方法的定义
                  path: '/login',
                  component: Login,
                  exact: true,
                  key: 'login'
              },
              {
                path: '/translation',
                component: Translation,
                loadData: Translation.loadData,
                exact: true,
                key: 'translation'
              },
              {
                component: NotFound
              }
            ]
          },
      ]
      ```

      2. 使用**matchRoutes(routes, pathname)**可以匹配多层路由,如果有loadData方法，就把它放到一个promise数组里，然后调用Promise.all方法，等所有数据准备好了，再生成页面返回给浏览器。

         ```js
         import {matchRoutes} from 'react-router-config'
         const matchedRoutes =  matchRoutes(routes, req.path)
         
         const promises = []
         matchedRoutes.forEach(item => {
             // 把store传进组件,这是一个异步函数
             if (item.route.loadData) {
                 // 经过包装，即使有请求失败，也会调用Promise.then()，显示请求成功的数据
                 const promise = new Promise((resolve, reject) => {
                     item.route.loadData(store).then(resolve).catch(resolve)
                 })
                 promises.push(promise)
             }
         })
         console.log(matchRoutes)
         
         // 让matchRoutes里面所有的组件，对应的loadData方法执行一次
         // 把获取到的数据，放到store里面
         ```


5. **流程小结**

   		1. 当用户访问网页的时候，先创建一个空的store
     		2.  看用户当前请求的路径和路由项，怎么去匹配，得出要加载的组件有哪些，放在matchRoutes里面
     		3. 对matchRoutes做循环，判断每个组件里是否有loadData方法，如果有，说明这个组件需要加载数据
     		4. 把LoadData执行一下，把它返回的promise放到promises数组里
     		5. 等promises数组里的内容都准备好了后，结合store里准备好的数据，当前路由的情况，和req请求，最终生成一个结果
     		6. 把生成的html返回给用户

   代码示例：

   `server/index.js`

   ```js
   import express from 'express'
   import {render} from './utils'
   import getStore from '../store/index'
   // now routes is Array
   import routes from '../Routes'
   // matchPath只能匹配一层路由，matchRoutes可以匹配多层路由
   import { matchRoutes } from 'react-router-config'
   
   const app = express()
   // 只要访问静态文件，就到根目录的public目录下查找
   app.use(express.static('public'))
   
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
       console.log(matchedRoutes)
   
       Promise.all(promises).then(() => {
           res.send(render(store, routes, req))
       })
   })
   
   const server = app.listen(3001, () => {
       const host = server.address().address
       const port = server.address().port
       console.log('Example app listening at http://%s:%s', host, port)
   })
   ```

   `server/utils.js`

   ```js
   import React from 'react'
   import { renderToString } from 'react-dom/server'
   // 服务端渲染路由只能用StaticRouter
   import { StaticRouter, Route } from 'react-router-dom'
   import { Provider } from 'react-redux'
   
   export const render = (store, routes, req) => {
       // 服务端渲染时，store里填充什么，需要结合当前用户请求地址和路由做判断
       // 如果访问/路径，就拿home组件的异步数据
       // 如果访问login路径，就拿login组件的异步数据
   
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
   ```

   