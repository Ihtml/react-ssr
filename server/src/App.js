import React from 'react'
import Header from './components/Header/'
import { renderRoutes } from 'react-router-config'
import {actions} from './components/Header/store'

const App = (props) => {
    console.log(props.route)
    return (
        <div>
            <Header></Header>
            {/* 显示页面对应的内容，渲染二级路由 */}
            {renderRoutes(props.route.routes)}
        </div>
    )
}

App.loadData = (store) => {
    store.dispatch(actions.getHeaderInfo())
}

export default App