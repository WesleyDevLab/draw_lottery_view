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
const SHOW_PANEL = 'SHOW_PANEL';
export const LOAD_TYPE = 'LOAD_TYPE';
export const SEND_MINI_ERROR = 'SEND_ERROR';
const SAVE_FILE = 'SAVE_FILE';
const SAVE_COVER = 'SAVE_COVER';
export const CHANGE_CODE = 'CHANGE_CODE';
export const SET_TOKEN = 'SET_TOKEN';
export const SAVE_IMAGES = 'SAVE_IMAGES';
export const test = (data) => ({
  type: TEST,
  data: data
});
export const loadType = (data) => ({
  type: LOAD_TYPE,
  data: data
});


export const showPanel = (panels) => ({
  type: SHOW_PANEL,
  data: panels,
});

export const sendMiniError = (target) => ({
  type: SEND_MINI_ERROR,
  data: target
});


export const saveFile = file => ({
  type: SAVE_FILE,
  data: file
})

export const saveCoverImgUrl = url => ({
  type: SAVE_COVER,
  data: url,
})

export const changeCode = (code) => ({
  type: CHANGE_CODE,
  data: code
})

export const setToken = (token) => ({
  type: SET_TOKEN,
  data: token,
})

export const saveImages = (images) => ({
  type: SAVE_IMAGES,
  data: images,
})

export const actions = {
  test,
  loadType,
  showPanel,
  sendMiniError,
  saveFile,
  saveCoverImgUrl,
  changeCode,
  setToken,
  saveImages,
};

export const actionHandlers = {
  [TEST]: (state, action) => Object.assign({}, state, {
    test: '经历了' + action.data
  }),
  [LOAD_TYPE]: (state, action) => Object.assign({}, state, {
    typeSources: action.data
  }),
  [SHOW_PANEL]: (state, action) => Object.assign({}, state, {
    panels: action.data
  }),
  [SEND_MINI_ERROR]: (state, action) => Object.assign({}, state, {
    miniError: action.data
  }),
  [SAVE_FILE]: (state, action) => Object.assign({}, state, {
    file: action.data
  }),
  [SAVE_COVER]: (state, action) => Object.assign({}, state, {
    coverUrl: action.data,
  }),
  [CHANGE_CODE]: (state, action) => Object.assign({}, state, {
    code: action.data
  }),
  [SET_TOKEN]: (state, action) => Object.assign({}, state, {
    token: action.data
  }),
  [SAVE_IMAGES]: (state, action) => Object.assign({}, state, {
    images: action.data
  })
};

const initialState = {
  span: '未连接',
  typeSources: [],
  panels: {first: false, second: false, third: false, four: false, five: false},
  miniError: {},
  file: null,
  coverUrl: null,
  code: "# Markdown",
  token: null,
  images: null,
};

const reducer = (state = initialState, action) => {
  const reduce = actionHandlers[action.type];
  return reduce ? reduce(state, action) : state;
};

export default reducer;
