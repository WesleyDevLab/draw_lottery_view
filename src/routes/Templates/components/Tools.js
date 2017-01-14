/**
 * 工具栏
 * draw_lottery Tools.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:06:47
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 *
 */

import React, {Component} from 'react'
import {Button, message} from 'antd'
import fetch from './../../../components/getFetch'
const groundUrl = 'commodity/ground';
const underUrl = 'commodity/under';
export default class Tools extends Component {
  constructor(props) {
    super(props);
  }

  ground() {
    const {keys,callback} = this.props;
    if (keys != null)
      fetch(groundUrl, (data) => {
        if (data.success) {
          message.success(data.message);
          console.log('callback',callback);
          callback();
        } else
          message.error(data.message);
      }, {data: keys});
  }

  unground() {
    const {keys,callback} = this.props;
    if (keys != null)
      fetch(underUrl, (data) => {
        if (data.success) {
          message.success(data.message);
          callback();
        } else
          message.error(data.message);
      }, {data: keys});
  }

  render() {
    return (

      <span>
      <Button onClick={this.ground.bind(this)}>上架</Button>
      <span className="ant-divider"/>
      {/*<Button onClick={this.unground.bind(this)}>下架</Button>*/}
        {/*<span className="ant-divider"/>
         <Button onClick={handleClick[2]}>修改</Button>
         <span className="ant-divider"/>
         <Button onClick={handleClick[3]}>上架</Button>
         <span className="ant-divider"/>
         <Button onClick={handleClick[4]}>下架</Button>*/}
    </span>

    )
  }
}
