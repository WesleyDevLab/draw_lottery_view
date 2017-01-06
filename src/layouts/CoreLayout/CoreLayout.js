import React, { Component } from 'react'
import './CoreLayout.scss'
import '../../styles/core.scss'
import 'antd/dist/antd.min.css'
import { Header, NextHeader, Sider, Footer } from '../../components/Page'

class CoreLayout extends Component {
  render() {
    console.log(this.props);
    const {children} = this.props;
    console.log(children);
    return (
      <div>
            <div className="layout-aside">
          <Sider/>
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
