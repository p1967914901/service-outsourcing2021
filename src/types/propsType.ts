/**
 * Load 组件的状态
 */
export interface loadType {
    isShow : boolean
}

/**
 * Rect 组件的状态
 */
export interface rectType {
    in_data: Array<number>,
    out_data: Array<number>,
    times: Array<string>,

}

/**
 * 整个 store 对象的类型
 */
export interface storeType {
    Load : loadType,
    Rect: rectType
}