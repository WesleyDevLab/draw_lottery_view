/**
 * $
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $
 * @link <a>https://userwu.github.io/</a>
 *
 */

export const SAVE_IMG_URL = 'SAVE_IMG_URL';

export const saveImgUrl = (url) => ({
  type: SAVE_IMG_URL,
  data: url,
});

export const actions = {
  saveImgUrl,
}

export const actionHandlers = {
  [SAVE_IMG_URL]: (state, action) => Object.assign({}, state, {imgUrl: action.data}),
}
const initialState = {
  imgUrl: null
}
export const reducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export default reducer;
