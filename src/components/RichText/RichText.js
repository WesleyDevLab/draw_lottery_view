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
    return {editor:null};
  },
  componentWillReceiveProps:function(nextProps){

  },
  render: function () {
    return (
      <div id={this.props.id} style={this.style} contentEditable="true"></div>
    );
  },
  componentDidMount: function () {
    const id = this.props.id;
    var editor = new window.wangEditor(id);
    this.setState({editor:editor})
    editor.config.uploadImgUrl = uploadUrl;
    editor.config.uploadImgFileName = 'file';
    editor.config.printLog = false;
    const _this = this
    editor.onchange = function () {
      _this.props.onChange(editor.$txt.html());
    }
    editor.config.uploadImgFns.onload = function (resultText, xhr){
      let data;
// 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
      const originalName = editor.uploadImgOriginalName || '';
      if(xhr.status == 200){
        data = JSON.parse(resultText);
        editor.command(null, 'insertHtml', '<img src="' + data.data + '" alt="' + originalName + '" style="max-width:100%;"/>');
      }else if(xhr.status == 500){
        data = JSON.parse(resultText);
        message.error(data.message);
      }
    }
    // 仅仅想移除某几个菜单，例如想移除『插入代码』和『全屏』菜单：
    // 其中的 wangEditor.config.menus 可获取默认情况下的菜单配置
    editor.config.menus = wangEditor.config.menus.map(function (item, key) {
      if (item === 'location') {
        return null;
      }
      return item;
    });
    editor.create();
  },
  componentWillUnmount: function () {
    this.state.editor.destroy();
  },
  // 获取内容
  getContent: function () {
    return this.state.editor.$txt.html();
  }
});
