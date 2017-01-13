/**
 * 首页
 * draw_lottery HomeView.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-08 23:02:39
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 *
 */
var React = require('react');
import {Upload, Icon, message, Button} from 'antd';
const Dragger = Upload.Dragger;
const props = {
  name: 'file',
  action: "http://127.0.0.1:8080/commodity/uploadImage",
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
}
var HomeView = React.createClass({

  render: function () {
    return (
      <div style={{marginTop: 16}}>
        <Upload {...props}>
          <img src="http://localhost:8080/170156db-bc1a-4433-b7e9-f1a6c685b6f9_java到JS通信原理.png"/>
          <Button><Icon type="upload"/> Click to Upload</Button>
        </Upload>
      </div>
    );
  }

});

module.exports = HomeView;
