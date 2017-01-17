/**
 * $
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $
 * @link <a>https://userwu.github.io/</a>
 *
 */

import React, {Component} from 'react'
import {Form, Button, Input, message, Upload, Icon} from 'antd'
import {STATIC_SERVE_PATH} from '../../../constants'
const Item = Form.Item;
import fetch from './../../../components/getFetch'
const uploadFileUrl = STATIC_SERVE_PATH + '/commodity/uploadImage';
const addUrl = 'commodity/addType'
export class _form extends Component {
  componentWillMount(){
    this.init();
  }
  onUploadCover(info) {
    if (info.file.status === 'done') {
      message.success(info.file.response.message);
      info.file.url = info.file.response.data;
    } else if (info.file.status === 'error') {
      message.error(info.file.response.message);
    }

    let fileList = info.fileList;
    //限制上传成功的最近一个文件
    fileList = fileList.slice(-1);
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.data;
      }
      return file;
    });
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.success === true;
      }
      return true;
    });
    const {saveImg} = this.props;
    saveImg(fileList);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {validateFields, getFieldsValue, getFieldValue} = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        let data = getFieldsValue();
        data.imgUrl = getFieldValue('imgUrl').file.url;
        fetch(addUrl, data => {
          message.success(data.message);
          this.init();
        }, {data: data})
      }
    });
  }

  init(){
    const {resetFields,} = this.props.form;
    resetFields();
    const {resetState} = this.props;
    resetState();
  }

  render() {
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
    };
    const fileProp = {
      name: 'file',
      action: uploadFileUrl,
      listType: 'picture',
      onChange: this.onUploadCover.bind(this),
    }
    const {getFieldDecorator} = this.props.form;
    const {img} = this.props.home;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Item label={'类型名'} {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{
              required: true,
              message: '请输入类型名'
            }]
          })(<Input/>)}
        </Item>

        <Item label={'类型图标'} {...formItemLayout}>
          {getFieldDecorator('imgUrl', {
            rules: [{
              required: true,
              message: '必须上传图标'
            }]
          })(<Upload {...fileProp} fileList={img}>
            <Button type='ghost'>
              <Icon type='upload'/> 点击上传
            </Button>
          </Upload>)}

        </Item>
        <Item wrapperCol={{span: 8, offset: 11}}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Item>
      </Form>
    )
  }
}

export default Form.create()(_form);
