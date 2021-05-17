import {
    CHANGE_LOADING_SHOW, 
    UPDATED_RECT
} from './../types/actionType'

/**
 * 改变加载动画的显示状态
 * @param isShow 是否加载
 */
export const changeLoadingShow = (isShow:boolean) => ({
    type : CHANGE_LOADING_SHOW,
    isShow
})
/**
 * 更新柱状图
 * @param data 柱状图数据
 * @returns 
 */
export const updataRect = (in_data:Array<number>, out_data:Array<number>, times:Array<string>) => ({
    type: UPDATED_RECT,
    in_data,
    out_data,
    times
})

