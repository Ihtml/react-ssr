// node环境下，只能用common.js规范，而不能用esmodile

const React =  require('react')

const Home = () => {
    return <div>home</div>
}

module.exports = {
    default: Home
}
