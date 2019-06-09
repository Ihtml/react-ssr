import axios from 'axios'
import {CHANGE_LIST} from './constants'

const changeList = (list) => ({
    type: CHANGE_LIST,
    list
})

export const getHomeList = () => {
    return (dispatch) => {
        // https://www.apiopen.top/journalismApi
        return axios.get('/api/journalismApi')
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