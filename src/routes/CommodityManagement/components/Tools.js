/**
 * 工具栏
 * draw_lottery Tools.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:06:47
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

import React, { Component } from 'react'
import {Button} from 'antd'
export default class Tools extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {model, handleClick} = this.props;
    return (
      <div>
    <span>
      <Button onClick={handleClick[0]}>详情</Button>
      <span className="ant-divider" />
      <Button  onClick={handleClick[1]}>设置</Button>
      <span className="ant-divider" />
      <Button  onClick={handleClick[2]}>修改</Button>
      <span className="ant-divider" />
      <Button  onClick={handleClick[3]}>删除</Button>
      <span className="ant-divider" />
      <Button  onClick={handleClick[4]}>下架</Button>
    </span>
    </div>
    )
  }
}

Tools.propTypes = {
  model:React.PropTypes.oneOf([null, 'one','many']).isRequired,
  handleClick:React.PropTypes.array.isRequired
}
