import axios from 'axios'
// 创建axios实例
const instance = axios.create({
    baseURL: '/api'
})

export default instance;
