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
export const ON_CHOOSE_KEY = 'ON_CHOOSE_KEY';
export const REFRESH_TABLE = 'REFRESH_TABLE';
const SAVE_STATE = 'SAVE_STATE';
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

export const toggleTools = (isShow = true) => ({
  type: TOGGLE_TOOLS,
  data: isShow,
})

export const onChoose = (data) => ({
  type: ON_CHOOSE_KEY,
  data: data,
})
export const refreshTable = ()=>({
  type:REFRESH_TABLE,
})
export const saveTableState = (data) => ({
  type:SAVE_STATE,
  data:data,
})
export const actions = {
  showTable,
  showLoading,
  showComplete,
  toggleTools,
  onChoose,
  refreshTable,
  saveTableState,
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
  [TOGGLE_TOOLS]: (state, action) => Object.assign({}, state, {
    isShowTools: action.data
  }),
  [ON_CHOOSE_KEY]: (state, action) => Object.assign({}, state, {
    choose: action.data,
  }),
  [REFRESH_TABLE]:(state) => Object.assign({},state,{test:!state.test}),
  [SAVE_STATE]:(state,action) => Object.assign({},state,{
  tableState:action.data
})
}

const initialState = {
  data: {},
  loading: false,
  keys: [],
  isShowTools: false,
  choose: null,
  test:false,
  tableState:{},
}
const reducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}
export default reducer;
