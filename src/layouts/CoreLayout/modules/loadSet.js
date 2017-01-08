/**
 * 
 * draw_lottery loadSet.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-08 16:48:14
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

//创建常量
export const LOAD_MAIN = "LOAD_MAIN";

//创建actions

export const loadMain = (data) => {
  return {
    type: LOAD_MAIN,
    data: data
  }
}

export const actions = {
  loadMain
}

//创建handlers
const actionHandlers = {
  [LOAD_MAIN]: (state, action) => {
    let sta = Object.assign({}, state, {
      menu: action.data
    })
    return sta;
  }
}

//创建reducer
const initialState = {home:{}};
const reducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export default reducer;
