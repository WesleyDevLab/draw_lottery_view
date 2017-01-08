/**
 * 布局管理器组件
 * draw_lottery CoreLayout.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-08 16:40:12
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

import React, { Component } from 'react'
import '../../../styles/core.scss'
import 'antd/dist/antd.min.css'
import { Header, NextHeader, Sider, Footer } from '../../../components/Page'
import fetch from '../../../components/getFetch'

class CoreLayout extends Component {
  componentWillMount() {
    const {loadMain} = this.props;
    fetch('getMenuResult', loadMain);
  }
  render() {
    const {children, home} = this.props;
    const {menu} = home;
    if(menu == null)
      return <div>正在加载...</div>
    return (
      <div>
            <div className="layout-aside">
          <Sider menu={menu}/>
              <div className="layout-main">
                    <Header/>
                    <div className="layout-container">
                    <NextHeader/>
                        <div className="layout-content">
                            <div style={{
        height: 590
      }}>
                        {children}
                    </div>
                </div>
                </div>
            <Footer/>
      </div>
  </div>
  </div>
      );
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
