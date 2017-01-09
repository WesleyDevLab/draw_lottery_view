import { injectReducer } from '../../store/reducers'
export default (store) => ({
  path: 'commodityManagement/add',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {

      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Commodity = require('./containers/AddContainer').default
      const reducer = require('./modules/formHandle').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, {
        key: 'addCommodity',
        reducer
      })
      cb(null, Commodity)
    }, 'addCommodity')
  }
})
