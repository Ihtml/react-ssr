import {CHANGE_LIST} from './constants'

const defaultState = {
    name: 'IFE',
    newsList: [
        {
            id: 'test',
            title: 'test'
        }
    ]
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case CHANGE_LIST:
            return {
                ...state,
                newsList: action.list
            }
        default:
            return state
    }
}