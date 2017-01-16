/**
 * $
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $
 * @link <a>https://userwu.github.io/</a>
 *
 */

const LOAD_DATA = 'LOAD_DATA';
const SHOW_LOADING = 'SHOW_LOADING';
const SAVE_STATE = 'SAVE_STATE';
export const ON_CHOOSE_KEY = 'ON_CHOOSE_KEY';
export const showData = (data) => ({
  type: LOAD_DATA,
  data: data,
})

export const showLoading = () => ({
  type: SHOW_LOADING,
})
export const saveTableState = (data) => ({
  type: SAVE_STATE,
  data: data,
})
export const onChoose = (data) => ({
  type: ON_CHOOSE_KEY,
  data: data,
})
export const actions = {
  showData,
  showLoading,
  saveTableState,
  onChoose,
}

const actionHandlers = {
  [LOAD_DATA]: (state, action) => Object.assign({}, state, {source: action.data, loading: false}),
  [SHOW_LOADING]: (state) => Object.assign({}, state, {loading: true}),
  [SAVE_STATE]: (state, action) => Object.assign({}, state, {
    tableState: action.data
  }),
  [ON_CHOOSE_KEY]: (state, action) => Object.assign({}, state, {
    choose: action.data,
  }),
}

const initialState = {
  source: {},
  loading: false,
  tableState:{},
  choose: null,
}

export const reducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export default reducer;


