import axios from 'axios'
import {CHANGE_LIST} from './constants'

const changeList = (list) => ({
    type: CHANGE_LIST,
    list
})

export const getHomeList = (server) => {
    let url = ''
    if (server) {
        // 如果是服务端渲染
        url = 'https://www.apiopen.top/journalismApi'
    } else {
        url = '/api/journalismApi'
    }

    return (dispatch) => {
        // https://www.apiopen.top/journalismApi
        return axios.get(url)
        .then((res) => {
            const list = res.data.data.tech
            // console.log(list)
            dispatch(changeList(list))
        })
        .catch((error) => {
            console.log(error)
        })
    }   
}