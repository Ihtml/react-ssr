export const CHANGE_LIST = 'HOME/CHANGE_LIST'
const defaultState = {
    translationList: [{id:1,title:"hello"}]
}

export default (state= defaultState, action) => {
    switch(action.type) {
        case CHANGE_LIST:
            return {
                ...state,
                translationList: action.list
            }
        default:
            return state
    }
}