/**
 * $
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $
 * @link <a>https://userwu.github.io/</a>
 *
 */

export const LOAD_DATA = 'LOAD_DATA';
export const SHOW_LOADING = 'SHOW_LOADING';
export const SHOW_COMPLETE = 'SHOW_COMPLETE';
export const LOAD_FILTERS = 'LOAD_FILTERS';
export const loadData = (data) => ({
  type: LOAD_DATA,
  data: data,
})
export const showLoading = () => ({
  type: SHOW_LOADING,
})
export const showComplete = (data) => ({
  type: SHOW_COMPLETE,
  data: data,
})
export const loadFilter = (data) => ({
  type: LOAD_FILTERS,
  data: data,
})
export const actions = {
  loadData,
  showLoading,
  showComplete,
  loadFilter,
}

export const actionHandlers = {
  [LOAD_DATA]: (state, action) => (Object.assign({}, state, {source: action.data, loading: false,})),
  [SHOW_LOADING]: (state) => Object.assign({}, state, {loading: true}),
  [SHOW_COMPLETE]: (state, action) => (Object.assign({}, state, {keys: action.data})),
  [LOAD_FILTERS]: (state, action) => (Object.assign({}, state, {filters: action.data})),
}

export const initialState = {
  source: {},
  loading: false,
  keys: [],
  filters: [],
}

export const reducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export default reducer;

