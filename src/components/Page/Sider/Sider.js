/**
 * 侧边栏组件
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-06 23:49:34
 * @version 1.0.0
 */
import React, { Component } from 'react';
import { Menu, Icon, Affix } from 'antd';
import { IndexLink, Link } from 'react-router'
class Sider extends Component {

  render() {
    const {menuItems} = this.props.menu;
    return (
      <aside className="layout-sider">
        <div className="layout-logo"></div>
        <Menu mode="inline" theme="dark"
      defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
          <Menu.Item key="1">
            <IndexLink to='/'><Icon type="appstore-o" />{menuItems[0]}</IndexLink>
          </Menu.Item>
            <Menu.Item key="2">
            <Link to='/commodityManagement'><Icon type="shopping-cart" /> {menuItems[1]}</Link></Menu.Item>
            <Menu.Item key="3"><Icon type="calculator" />{menuItems[2]}</Menu.Item>
            <Menu.Item key="4"><Icon type="team" />{menuItems[3]}</Menu.Item>
          <Menu.Item key="5"><Icon type="share-alt" />{menuItems[4]}</Menu.Item>
            <Menu.Item key="6"><Icon type="pay-circle-o" />{menuItems[5]}</Menu.Item>
            <Menu.Item key="7"><Icon type="dingding-o" />{menuItems[6]}</Menu.Item>
            <Menu.Item key="8"><Icon type="file" />{menuItems[7]}</Menu.Item>
          <Menu.Item key="9"><Icon type="notification" />{menuItems[8]}</Menu.Item>
        </Menu>
      </aside>
      );
  }
}

Sider.propTypes = {
  menu: React.PropTypes.object.isRequired
}
export default Sider;
