/**
 * $
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $
 * @link <a>https://userwu.github.io/</a>
 *
 */
import {injectReducer} from '../../store/reducers'
export default (store) => ({
  path: 'commodityManagement/templates',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Template = require('./containers/tempContainer').default
      const reducer = require('./modules/temp').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, {
        key: 'template',
        reducer
      })

      /*  Return getComponent   */
      cb(null, Template)

      /* Webpack named bundle   */
    }, 'template')
  }
})

