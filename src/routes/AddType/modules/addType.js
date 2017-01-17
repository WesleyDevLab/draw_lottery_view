/**
 * $
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $
 * @link <a>https://userwu.github.io/</a>
 *
 */

export const SAVE_IMG = 'SAVE_IMG';
export const RESET_STATE = 'RESET_STATE';

export const saveImg = (url) => ({
  type: SAVE_IMG,
  data: url,
});

export const resetState = () => ({
  type: RESET_STATE,
})

export const actions = {
  saveImg,
  resetState,
}

export const actionHandlers = {
  [SAVE_IMG]: (state, action) => Object.assign({}, state, {img: action.data}),
  [RESET_STATE]: (state, action) => Object.assign({}, state, {img: null})
}
const initialState = {
  img: null
}
export const reducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export default reducer;
