const express = require('express')
const app = express()
const Home = require('./containers/Home')

// 访问应用的跟路径，展示一个内容为hello world的html
app.get('/', (req, res) => res.send(
		`<html>
			<head>
				<title>hello world</title>
			</head>
			<body>
				<h1>first</h1>
				<p>hello world</p>
			</body>
		</html>`
	))

const server = app.listen(3001, () => {
	const host = server.address().address
	const port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)
})