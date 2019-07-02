import axios from 'axios'
import config from '../config'

// 创建axios实例
const instance = axios.create({
    baseURL: '/',
    params: {
        secret: config.secret
    }
})

export default instance;
