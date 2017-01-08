/**
 * 
 * draw_lottery commodity.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-08 23:22:53
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */
export const LOAD_TABLE = 'LOAD_TABLE';
export const LOADING = 'LOADING';

export const showTable = data => ({
    type:LOAD_TABLE,
    data:data
})

export const showLoading = () => ({
  type:LOADING
})

export const actions = {
    showTable,showLoading
}

export const handlers = {
    [LOAD_TABLE]:(state,action)=>Object.assign({},state,{data:action.data,loading:false}),
    [LOADING]:(state)=>Object.assign({},state,{loading:true}),
}

const initialState = {data:{},loading:false}
const reducer = (state = initialState,action)=>{
    const handler = handlers[action.type];
    return handler?handler(state,action):state;
}
export default reducer;
