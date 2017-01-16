/**
 *
 * draw_lottery AddContainers.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 19:31:17
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 *
 */
import {connect} from 'react-redux'
import {
  test,
  loadType,
  showPanel,
  sendMiniError,
  saveCoverImgUrl,
  changeCode,
  setToken,
  saveImages
} from './../modules/formHandle'
import AddCommodity from './../components/AddCommodity'

export const mapStateToProps = (state) => ({
  home: state.addCommodity,
})

export const mapDispatchToProps = {
  test, loadType, showPanel, sendMiniError, saveCoverImgUrl, changeCode, setToken, saveImages
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCommodity)

