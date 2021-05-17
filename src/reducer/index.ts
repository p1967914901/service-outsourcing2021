import {combineReducers} from 'redux'
import {
    storeType, 
    loadType,
    rectType
} from './../types/propsType'
import {
    CHANGE_LOADING_SHOW, UPDATED_RECT
} from './../types/actionType'

const initStore:storeType = {
    Load : {
        isShow : true
    },
    Rect: {
        in_data: [],
        out_data: [],
        times: []
    }
}
const LoadReducer = (state:loadType = initStore.Load, action:any) => {
    if (action.type === CHANGE_LOADING_SHOW) {
        const {isShow} = action
        // console.log(action)
        return {
            ...state,
            isShow
        }
    }
    return state
}

const rectReducer = (state:rectType = initStore.Rect, action:any) => {
    if (action.type === UPDATED_RECT) {
        const {in_data, out_data, times} = action
        // console.log('action :>> ', action);
        return {
            ...state,
            in_data,
            out_data,
            times
        }
    }
    return state
}

const combineReducer = combineReducers({
    Load : LoadReducer,
    Rect: rectReducer
})
const reducer = (state:storeType = initStore, action:any) => {
    const store1:storeType = combineReducer(state, action)
    return store1
}
export default reducer