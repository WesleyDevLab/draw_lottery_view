/**
 * CoreLayout container
 * draw_lottery CoreLayoutContainer.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-08 16:46:29
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

import { loadMain } from '../modules/loadSet'
import { connect } from 'react-redux'
import CoreLayout from '../components/CoreLayout'
const mapDispatcherToProps = {
  loadMain
}
//将全局的state映射到组件的props，相当于从store获取数据
const mapStateToProps = (state) => {
  console.log('map state to prop + state ===', state);
  return {
    home: state.home
  }
}
const Core = connect(mapStateToProps, mapDispatcherToProps)(CoreLayout);
export default Core;
