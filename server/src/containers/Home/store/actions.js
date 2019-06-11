import axios from 'axios'
import {CHANGE_LIST} from './constants'
import clientAxios from '../../../client/request'
import serverAxios from '../../../server/request'

const changeList = (list) => ({
    type: CHANGE_LIST,
    list
})

export const getHomeList = (server) => {
    const request = server ? serverAxios : clientAxios

    return (dispatch) => {
        // https://www.apiopen.top/journalismApi
        return request.get('/journalismApi')
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