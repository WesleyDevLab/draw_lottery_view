/**
 *
 * draw_lottery formHandle.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 19:31:30
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 *
 */

const SHOW_PANEL = 'SHOW_PANEL';
export const LOAD_TYPE = 'LOAD_TYPE';
export const SAVE_IMAGES = 'SAVE_IMAGES';
export const SAVE_COVER_IMAGE = 'SAVE_COVER_IMAGE';
export const RESET_FORM = 'RESET_STATE';

export const loadType = (data) => ({
  type: LOAD_TYPE,
  data: data
});


export const showPanel = (panels) => ({
  type: SHOW_PANEL,
  data: panels,
});

export const saveImages = (images) => ({
  type: SAVE_IMAGES,
  data: images,
})

export const saveCoverImage = (img) =>({
  type:SAVE_COVER_IMAGE,
  data:img,
})

export const resetForm = () => ({
  type:RESET_FORM,
})

export const actions = {
  loadType,
  showPanel,
  saveImages,
  saveCoverImage,
  resetForm,
};

export const actionHandlers = {
  [LOAD_TYPE]: (state, action) => Object.assign({}, state, {
    typeSources: action.data
  }),
  [SHOW_PANEL]: (state, action) => Object.assign({}, state, {
    panels: action.data
  }),
  [SAVE_IMAGES]: (state, action) => Object.assign({}, state, {
    images: action.data
  }),
  [SAVE_COVER_IMAGE]:(state,action) => Object.assign({},state,{
    coverImg:action.data,
  }),
  [RESET_FORM]:(state)=>Object.assign({},state,{
    panels: {first: false, second: false, third: false, four: false, five: false},
    images: null,
    coverImg:null,
  }),
};

const initialState = {
  typeSources: [],
  panels: {first: false, second: false, third: false, four: false, five: false},
  images: null,
  coverImg:null,
};

const reducer = (state = initialState, action) => {
  const reduce = actionHandlers[action.type];
  return reduce ? reduce(state, action) : state;
};

export default reducer;
