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

1. webpack服务端配置：

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

2. 添加服务端渲染的入口文件`src/server/index.js`

   ![](https://raw.githubusercontent.com/Ihtml/images/master/img/20190724233204.jpg)

   服务器端用**StaticRouter**，**把用户请求的路径传递给StaticRouter，才知道当前所处的位置**，需要传入一个location,使用**context**对象做数据通讯获取。

   创建一个Routes.js文件用于匹配路由。

   