import axios from 'axios'
// 创建axios实例
const createInstance = (req) => axios.create({
    baseURL: 'https://www.apiopen.top',
    headers: {
        // 没有cookie的时候传空
        cookie: req.get('cookie') || ''
    }
})

export default createInstance;
