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
export const SHOW_COMPELETE = 'SHOW_COMPELETE';
export const TOGGLE_TOOLS = 'TOGGLE_TOOLS';
export const showTable = data => ({
  type: LOAD_TABLE,
  data: data
})

export const showLoading = () => ({
  type: LOADING
})

export const showComplete = data => ({
  type: SHOW_COMPELETE,
  data: data,
})

export const toggleTools = (isShow=true) => ({
  type:TOGGLE_TOOLS,
  data:isShow,
})
export const actions = {
  showTable,
  showLoading,
  showComplete,
  toggleTools,
}

export const handlers = {
  [LOAD_TABLE]: (state, action) => Object.assign({}, state, {
    data: action.data,
    loading: false
  }),
  [LOADING]: (state) => Object.assign({}, state, {
    loading: true
  }),
  [SHOW_COMPELETE]: (state, action) => Object.assign({}, state, {
    keys: action.data
  }),
  [TOGGLE_TOOLS]: (state,action)=>Object.assign({},state,{
    isShowTools:action.data
  })
}

const initialState = {
  data: {},
  loading: false,
  keys: [],
  isShowTools:false
}
const reducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}
export default reducer;
