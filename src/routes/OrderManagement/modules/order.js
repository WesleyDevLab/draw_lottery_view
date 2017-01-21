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
export const SHOW_LOADING = 'SHOW_LOADING';
export const SHOW_COMPLETE = 'SHOW_COMPLETE';
export const LOAD_FILTERS = 'LOAD_FILTERS';
export const SHOW_DETAILS_MODAL = 'SHOW_DETAILS_MODAL';
export const LOAD_DETAILS = 'LOAD_DETAILS';
export const SHOW_DELIVERY_MODAL = 'SHOW_DELIVERY_MODAL';
export const SAVE_DELI_ID = 'SAVE_DELI_ID';
export const loadData = (data) => ({
  type: LOAD_DATA,
  data: data,
})
export const showLoading = () => ({
  type: SHOW_LOADING,
})
export const showComplete = (data) => ({
  type: SHOW_COMPLETE,
  data: data,
})
export const loadFilters = (data) => ({
  type: LOAD_FILTERS,
  data: data,
})
export const loadDetails = (data) => ({
  type: LOAD_DETAILS,
  data: data,
})
export const showDetailsModal = (show) => ({
  type:SHOW_DETAILS_MODAL,
  data:show,
})
export const showDeliveryModal = (show) => ({
  type:SHOW_DELIVERY_MODAL,
  data:show,
})
export const saveDeliveryId = (id) => ({
  type:SAVE_DELI_ID,
  data:id,
})
export const actions = {
  loadData,
  showLoading,
  showComplete,
  loadFilters,
  loadDetails,
  showDetailsModal,
  showDeliveryModal,
  saveDeliveryId,
}

export const actionHandlers = {
  [LOAD_DATA]: (state, action) => (Object.assign({}, state, {source: action.data, loading: false,})),
  [SHOW_LOADING]: (state) => Object.assign({}, state, {loading: true}),
  [SHOW_COMPLETE]: (state, action) => (Object.assign({}, state, {keys: action.data})),
  [LOAD_FILTERS]: (state, action) => (Object.assign({}, state, {filters: action.data})),
  [LOAD_DETAILS]: (state, action) => (Object.assign({}, state, {details: action.data})),
  [SHOW_DETAILS_MODAL]:(state,action) => (Object.assign({},state,{detailsVisible:action.data,})),
  [SHOW_DELIVERY_MODAL]:(state,action)=>(Object.assign({},state,{deliveryVisible:action.data})),
  [SAVE_DELI_ID]:(state,action)=>Object.assign({},state,{deliveryId:action.data}),
}

export const initialState = {
  source: {},
  loading: false,
  keys: [],
  filters: [],
  details: null,
  detailsVisible:false,
  deliveryVisible:false,
  deliveryId:null,
}

export const reducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export default reducer;

