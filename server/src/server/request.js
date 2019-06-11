import axios from 'axios'
// 创建axios实例
const instance = axios.create({
    baseURL: 'https://www.apiopen.top'
})

export default instance;
