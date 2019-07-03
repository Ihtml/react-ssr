import {CHANGE_LIST} from './constants'

const changeList = (list) => ({
    type: CHANGE_LIST,
    list
})

// 外部就把axios的实例传递进来了
export const getHomeList = () => {
    return (dispatch, getState, axiosInstance) => {
        // https://www.apiopen.top/journalismApi
        return axiosInstance.get('/api/news.json?secret=PP87ANTIPIRATE')
        .then((res) => {
            const list = res.data.data
            dispatch(changeList(list))
        })
        .catch((error) => {
            console.log(error)
        })
    }   
}