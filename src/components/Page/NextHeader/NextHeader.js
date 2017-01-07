/**
 * 二级Header
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-07 00:01:09
 * @version $Id$
 */

import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
class NextHeader extends Component {
  render() {
    return (
      <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>应用列表</Breadcrumb.Item>
            <Breadcrumb.Item>某应用</Breadcrumb.Item>
          </Breadcrumb>
      );
  }
}
export default NextHeader;
