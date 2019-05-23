import express from 'express'
import Home from './containers/Home'
import React from 'react'
import { renderToString } from 'react-dom/server'

const app = express()
// 只要访问静态文件，就到根目录的public目录下查找
app.use(express.static('public'))

const content = renderToString(<Home />)

// 访问应用的跟路径，展示一个内容为hello world的html
app.get('/', (req, res) => res.send(
	`
	<html>
		<head>
			<title>react ssr</title>
		</head>
		<body>
			${content}
			<script src='/index.js'></script>
		</body>
	</html>
	`
))

const server = app.listen(3001, () => {
	const host = server.address().address
	const port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)
})