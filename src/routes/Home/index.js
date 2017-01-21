import HomeView from './containers/HomeViewContainer'
import {injectReducer} from '../../store/reducers'
import reducer from './modules/homeView'
/*// Sync route definition
 export default {
 component: HomeView
 }*/

export default (store) => ({
  getComponent(nextState, cb) {
    injectReducer(store, {
      key: 'homeView',
      reducer
    })
    cb(null, HomeView);
  }
})
