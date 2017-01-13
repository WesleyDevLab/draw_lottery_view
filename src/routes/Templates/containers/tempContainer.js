/**
 * $
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $
 * @link <a>https://userwu.github.io/</a>
 *
 */

import {showData, loadTypes, showLoading,onChoose,saveTableState} from './../modules/temp';
import {connect} from 'react-redux';
import Template from './../components/Template'
export const mapStateToProps = (store) => ({
  home: store.template,
});

export const mapDispatchToProps = {
  showData,
  loadTypes,
  showLoading,
  onChoose,
  saveTableState,
}

export default connect(mapStateToProps, mapDispatchToProps)(Template);

