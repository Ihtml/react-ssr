export const getTranslationList = () => {
    return (dispatch, getState, axiosInstance) => {
        return axiosInstance.get('/api/translations.json?secret=abcd')
            .then((res) => {
                console.log(res.data)
                if (res.data.success) {
                    const list = res.data.data
                } else {
                    const list = []
                }
            })
    }
}