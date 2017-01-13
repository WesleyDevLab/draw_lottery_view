/**
 *
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version
 * @link <a>https://userwu.github.io/</a>
 *
 */
const SHOW_DATA = 'SHOW_DATA';
const LOAD_TYPES = 'LOAD_TYPES';
export const LOADING = 'LOADING';
const ON_CHOOSE_KEY = 'ON_CHOOSE_KEY';
const SAVE_STATE = 'SAVE_STATE';
export const showData = (data) => ({
  type: SHOW_DATA,
  data: data,
});
export const showLoading = () => ({
  type: LOADING
});
export const loadTypes = (data) => ({
  type: LOAD_TYPES,
  data: data,
});

export const onChoose = (data) => ({
  type: ON_CHOOSE_KEY,
  data: data,
})
export const saveTableState = (data) => ({
  type:SAVE_STATE,
  data:data,
})

const actions = {
  showData,
  loadTypes,
  showLoading,
  onChoose,
  saveTableState,
};

const handlers = {
  [SHOW_DATA]: (state, action) => Object.assign({}, state, {source: action.data, loading: false}),
  [LOAD_TYPES]: (state, action) => Object.assign({}, state, {types: action.data}),
  [LOADING]: (state) => Object.assign({}, state, {
    loading: true
  }),
  [ON_CHOOSE_KEY]: (state, action) => Object.assign({}, state, {
    choose: action.data,
  }),
  [SAVE_STATE]:(state,action) => Object.assign({},state,{
    tableState:action.data
  })
};

const initialState = {
  source: [],
  types: [],
  loading: false,
  choose: null,
  test:false,
  tableState:{},
};

export const reducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
};

export default reducer;
