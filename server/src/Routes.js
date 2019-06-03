import React from 'react'
// import {Route} from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'

export default  [
    {
      path: "/",
      component: Home,
      // 精确匹配
      exact: true,
      // 加载HOme组件之前要执行的方法,
      loadData: Home.loadData,
      key: 'home'
    },
    {
        //直接展示login组件，不需要加载任何的数据，不需要loadData方法的定义
        path: '/login',
        component: Login,
        exact: true,
        key: 'login'
    }
    // etc.
]
// export default (
//     <div>
//         <Route path='/' exact component={Home}></Route>
//         <Route path='/login' exact component={Login}></Route>
//     </div>
// )