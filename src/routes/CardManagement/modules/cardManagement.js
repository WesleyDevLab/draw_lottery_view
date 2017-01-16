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
const SHOW_MODAL = 'SHOW_MODAL';
const SHOW_CONFIRM_LOADING = 'SHOW_CONFIRM_LOADING';
const HIDE_CONFIRM_LOADING = 'HIDE_CONFIRM_LOADING';
const HIDE_MODAL = 'HIDE_MODAL';
const SUBMIT = 'SUBMIT';
const SUBMIT_AFTER = 'SUBMIT_AFTER';

export const showModal = (data) => ({
  type: SHOW_MODAL,
  data: data,
});

export const showConfirm = () => ({
  type: SHOW_CONFIRM_LOADING,
})

export const hideConfirm = () => ({
  type: HIDE_CONFIRM_LOADING,
})

export const hideModal = () => ({
  type: HIDE_MODAL,
})
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
export const submitForm = ()=> ({
  type:SUBMIT
})
export const actions = {
  showData,
  showLoading,
  saveTableState,
  onChoose,
  submitForm,
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
  [SHOW_MODAL]: (state, action) => Object.assign({}, state, {visible: true, modalSource: action.data}),
  [SHOW_CONFIRM_LOADING]: (state) => Object.assign({}, state, {confirmLoading: true}),
  [HIDE_CONFIRM_LOADING]: (state) => Object.assign({}, state, {confirmLoading: false, visible: false}),
  [HIDE_MODAL]: (state) => Object.assign({}, state, {visible: false}),
  [SUBMIT]:(state) => Object.assign({},state,{submit:true}),
}

const initialState = {
  source: {},
  loading: false,
  tableState:{},
  choose: null,
  visible: false,
  confirmLoading: false,
  modalSource: {title:'添加卡密',source:[]},
  submit:false,
}

export const reducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export default reducer;


