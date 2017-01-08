/**
 * 侧边栏组件
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-06 23:49:34
 * @version 1.0.0
 */
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { IndexLink, Link } from 'react-router'
class Sider extends Component {

  render() {
    return (

      <aside className="layout-sider">
        <div className="layout-logo"></div>
        <Menu mode="inline" theme="dark"
      defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
          <Menu.Item key="1">
            <IndexLink to='/'><Icon type="appstore-o" />首页</IndexLink>
          </Menu.Item>
            <Menu.Item key="2">
            <Link to='/counter'><Icon type="shopping-cart" /> 商品管理</Link></Menu.Item>
            <Menu.Item key="3"><Icon type="calculator" />订单管理</Menu.Item>
            <Menu.Item key="4"><Icon type="team" />用户管理</Menu.Item>
          <Menu.Item key="5"><Icon type="share-alt" />晒单管理</Menu.Item>
            <Menu.Item key="6"><Icon type="pay-circle-o" />积分管理</Menu.Item>
            <Menu.Item key="7"><Icon type="dingding-o" />广告管理</Menu.Item>
            <Menu.Item key="8"><Icon type="file" />留言反馈</Menu.Item>
          <Menu.Item key="9"><Icon type="notification" />消息管理</Menu.Item>
        </Menu>
      </aside>
      );
  }
}
export default Sider;