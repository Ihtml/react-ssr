// node环境下，只能用common.js规范，而不能用esmodile
// 在使用webpack和babel后，js文件会被编译打包，可以使用esmodule语法了
import React from 'react'

const Home = () => {
    return <div>this is home component</div>
}

export default Home
