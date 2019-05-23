// 在客户端执行的代码

import React from 'react'
import ReactDom from 'react-dom'

import Home from '../containers/Home'

// 用hydrate
ReactDom.hydrate(<Home />, document.getElementById('root'))