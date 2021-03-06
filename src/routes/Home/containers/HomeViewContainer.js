/**
 * $
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $
 * @link <a>https://userwu.github.io/</a>
 *
 */

import {loadData} from './../modules/homeView'
import HomeView from './../components/HomeView'
import {connect} from 'react-redux'
export const mapStateToProps = (state) => ({
  home: state.homeView,
});

export const mapDispatchToProps = {
  loadData,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
