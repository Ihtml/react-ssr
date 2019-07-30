## [react-ssr](https://github.com/Ihtml/react-ssr/tree/master/server)
从零实现一个react ssr服务端渲染项目的脚手架,熟悉react服务端渲染原理。   
`cd server`     
`npm install`   
`npm run dev`   
打开[localhost:3001](http://localhost:3001)预览,检查网页的源代码，可以看到是有内容的。    

## [react-prerender](https://github.com/Ihtml/react-ssr/tree/master/react-prerender-demo)
如果一个项目对SEO要求很高，而对首屏速度要求不高，可以用预渲染。     
启动客户端：    
`cd react-prerender-demo`   
`cd client`     
`npm start`     
启动服务端：    
`cd prerender-server`       
`node server.js`    
预览：  
访问[http://localhost:8000/render?url=http://localhost:3000](http://localhost:8000/render?url=http://localhost:3000)，查看源代码，可以看到是有内容的。