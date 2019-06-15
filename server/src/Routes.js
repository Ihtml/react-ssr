import React from 'react'
// import {Route} from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
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
        }
      ]
    },
]
// export default (
//     <div>
//         <Route path='/' exact component={Home}></Route>
//         <Route path='/login' exact component={Login}></Route>
//     </div>
// )