/**
 * 
 * draw_lottery formHandle.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 19:31:30
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

export const TEST = 'TEST';
export const SHOW_LOADING = 'SHOW_LOADING';
export const LOAD_TYPE = 'LOAD_TYPE';
export const test = (data) => ({
  type: TEST,
  data: data
})
export const loadType = (data) => ({
  type: LOAD_TYPE,
  data: data
})

export const actions = {
  test,
  loadType
}

export const actionHandlers = {
  [TEST]: (state, action) => Object.assign({}, state, {
    test: '经历了' + action.data
  }),
  [LOAD_TYPE]: (state, action) => Object.assign({}, state, {
    typeSources: action.data
  }),
}

const initialState = {
  span: '未连接',
  typeSources: [],
}

const reducer = (state = initialState, action) => {
  const reduce = actionHandlers[action.type];
  return reduce ? reduce(state, action) : state;
}

export default reducer;
