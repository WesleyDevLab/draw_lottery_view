/**
 * $
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $
 * @link <a>https://userwu.github.io/</a>
 *
 */

import {connect} from 'react-redux'
import {showData, showLoading, saveTableState, onChoose} from './../modules/cardManagement'
import Card from './../components/CardManagement'

export const mapStateToProps = (state) => ({
  home: state.card
})

export const mapDispatchToProps = {
  showData,
  showLoading,
  saveTableState,
  onChoose,
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
