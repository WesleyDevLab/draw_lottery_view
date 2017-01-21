/**
 * 首页
 * draw_lottery HomeView.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-08 23:02:39
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 *
 */
import React, {Component} from 'react'
import fetch from './../../../components/getFetch';
const cardCountUrl = 'cardCount';
const cors = ['移动', '联通', '电信'];
const moneys = ['10', '30', '50', '100'];
import { Spin } from 'antd';
export default class HomeView extends Component {
  componentDidMount() {
    const {loadData} = this.props;
    fetch(cardCountUrl, loadData);
  }

  render() {
    const {data} = this.props.home;
    return (
      <div>
        {data?cors.map((cor,index1)=>(
          moneys.map((money,index2)=>(
            <div>
              {cor}-{money}：{data[index1*3+index2]}
            </div>
          ))
        )):<Spin />}
      </div>
    )
  }
}
