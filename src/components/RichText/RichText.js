/**
 * $
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $
 * @link <a>https://userwu.github.io/</a>
 *
 */
var React = require('react');
import 'wangeditor'
import {STATIC_SERVE_PATH} from '../../constants'
import {message} from 'antd';
const uploadUrl = STATIC_SERVE_PATH + '/commodity/uploadImage';
export default React.createClass({
  // 编辑器样式
  style: {
    width: '100%',
    height: '400px'
  },
  getInitialState:function(){
    return {content:this.props.content};
  },
  componentWillReceiveProps:function(nextProps){
    this.setState({
      content: nextProps.value
    })
  },
  render: function () {
    return (
      <div>
        <div id={this.props.id} style={this.style} contentEditable="true"></div>
      </div>
    );
  },
  componentDidMount: function () {
    var id = this.props.id;
    this.editor = new window.wangEditor(id);
    this.editor.config.uploadImgUrl = uploadUrl;
    this.editor.config.uploadImgFileName = 'file';

    var _this = this;
    this.editor.onchange = function () {
      _this.props.onChange(_this.editor.$txt.html());
    }
    this.editor.config.uploadImgFns.onload = function (resultText, xhr){
      // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
      var originalName = _this.editor.uploadImgOriginalName || '';
      if(xhr.status == 200){
        var data = JSON.parse(resultText);
        _this.editor.command(null, 'insertHtml', '<img src="' + data.data + '" alt="' + originalName + '" style="max-width:100%;"/>');
      }else if(xhr.status == 500){
        var data = JSON.parse(resultText);
        message.error(data.message);
      }
    }
    // 仅仅想移除某几个菜单，例如想移除『插入代码』和『全屏』菜单：
    // 其中的 wangEditor.config.menus 可获取默认情况下的菜单配置
    this.editor.config.menus = wangEditor.config.menus.map(function (item, key) {
      if (item === 'location') {
        return null;
      }
      return item;
    });
    this.editor.create();

    // 初始化内容
    this.editor.$txt.html(this.state.content);
  },
  componentWillUnmount: function () {
    this.editor.destroy();
  },
  // 获取内容
  getContent: function () {
    var content = this.editor.$txt.html();
    return content;
  }
});
