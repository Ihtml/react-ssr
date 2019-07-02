import axios from 'axios'
import config from '../config'

// 创建axios实例
const createInstance = (req) => axios.create({
    // baseURL: 'https://www.apiopen.top',
    baseURL: 'http://47.95.113.63/ssr',
    headers: {
        // 没有cookie的时候传空
        cookie: req.get('cookie') || '',
        params: {
            secret: config.secret
        }
    }
})

export default createInstance;
