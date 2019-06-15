
export const getHeaderInfo = () => {
    // 使用redux-thunk后，如果返回的是函数，会接收dispatch方法做参数
    return (dispatch, getState, axiosInstance) => {
        return axiosInstance.get('/api/isLogin').then((res) => {
            console.log(res)
        })
    }
}