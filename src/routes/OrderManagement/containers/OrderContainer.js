/**
 * $
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $
 * @link <a>https://userwu.github.io/</a>
 *
 */

import {loadData, showLoading, showComplete} from './../modules/order'
import {connect} from 'react-redux'
import Order from './../components/Order'
export const mapStateToProps = (state) => ({
  home: state.order,
})

export const mapDispatchToProps = {
  loadData,
  showLoading,
  showComplete,
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
