// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import PageNotFound from './PageNotFound'
import Redirect from './PageNotFound/redirect'
import Commodity from './CommodityManagement'
import AddCommodity from './AddCommodity'
import Template from './Templates'
import CardManagement from './CardManagement'
import AddType from './AddType'
import Order from './OrderManagement'
/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout(store),
  indexRoute: Home(store),
  childRoutes: [
    Commodity(store),
    AddCommodity(store),
    AddType(store),
    Template(store),
    CardManagement(store),
    Order(store),
    PageNotFound(),
    Redirect
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
 using getChildRoutes with the following signature:

 getChildRoutes (location, cb) {
 require.ensure([], (require) => {
 cb(null, [
 // Remove imports!
 require('./Counter').default(store)
 ])
 })
 }

 However, this is not necessary for code-splitting! It simply provides
 an API for async route definitions. Your code splitting should occur
 inside the route `getComponent` function, since it is only invoked
 when the route exists and matches.
 */

export default createRoutes
