### 启动客户端渲染的单页应用
`cd client`     
`npm install`       
`npm start`

### 启动预渲染
`cd prerender-server`       
`node server.js`

### 查看效果
访问http://localhost:8000/render?url=http://localhost:3000，查看网页源代码，可以看到是有内容的。说明pretender-server预渲染成功。