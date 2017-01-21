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

export const loadData = (data) => ({
  type: LOAD_DATA,
  data: data,
})

export const actions = {
  loadData,
}

export const actionHandlers = {
  [LOAD_DATA]: (state, action) => (Object.assign({}, state, {data: action.data,})),
}

export const initialState = {
  data: null,
}

export const reducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export default reducer;

