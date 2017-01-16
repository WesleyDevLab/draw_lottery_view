/**
 * $
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $
 * @link <a>https://userwu.github.io/</a>
 *
 */

import {saveImgUrl} from './../modules/addType'
import {connect} from 'react-redux'
import AddType from './../components/AddType'
export const mapStateToProps = (state)=>({
  home:state.addType
})

export const mapDispatchToProps = {
  saveImgUrl,
}

export default connect(mapStateToProps,mapDispatchToProps)(AddType);
