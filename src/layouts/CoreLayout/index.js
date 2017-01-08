import CoreLayout from './container/CoreLayoutContainer'

import { injectReducer } from '../../store/reducers'
import reducer from './modules/loadSet'

const Core = store => {
  injectReducer(store, {
    key: 'home',
    reducer
  })
  return CoreLayout;
}

export default Core
