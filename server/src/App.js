import React from 'react'
import Header from './components/Header/'
import { renderRoutes } from 'react-router-config'
import {actions} from './components/Header/store'

const App = (props) => {
    return (
        <div>
            <Header staticContext={props.staticContext}></Header>
            {/* 显示页面对应的内容，渲染二级路由 */}
            {renderRoutes(props.route.routes)}
        </div>
    )
}

App.loadData = (store) => {
    // 要把promise继续向上返回，这样item.route.loadData(store)才是一个promise
    return store.dispatch(actions.getHeaderInfo())
}

export default App