/**
 * 
 * draw_lottery commodityContainer.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-08 23:30:58
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

import { showTable, showLoading, showComplete,toggleTools } from './../modules/commodity'
import { connect } from 'react-redux';
import Commodity from './../components/Commodity'

const mapDispatchToProps = {
  showTable,
  showLoading,
  showComplete,
  toggleTools
}

const mapStateToProps = (state) => ({
  home: state.commodity
})

export default connect(mapStateToProps, mapDispatchToProps)(Commodity);

