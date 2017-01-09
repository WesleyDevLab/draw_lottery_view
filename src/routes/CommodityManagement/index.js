/**
 * 
 * draw_lottery index.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 00:43:04
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */
import { injectReducer } from '../../store/reducers'
export default (store) => ({
  path: 'commodityManagement',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Commodity = require('./containers/CommodityContainer').default
      const reducer = require('./modules/commodity').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, {
        key: 'commodity',
        reducer
      })

      /*  Return getComponent   */
      cb(null, Commodity)

    /* Webpack named bundle   */
    }, 'commodity')
  }
})

