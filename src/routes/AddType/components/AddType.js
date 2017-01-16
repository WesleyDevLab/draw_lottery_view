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
  onUploadCover(info) {
    const {saveImgUrl} = this.props;
    const {setFieldsValue} = this.props.form;
    if (info.file.status === 'done') {
      setFieldsValue({imgUrl: info.file.response.data});
      message.success(info.file.response.message);
    } else if (info.file.status === 'error') {
      message.error(info.file.response.message);
    }
  }
  handleSubmit(e) {
    e.preventDefault();


    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = this.props.form.getFieldsValue();
        fetch(addUrl, data => message.success(data.message), {data: data})
      }
    });
  }
  render() {
    console.log(this.props);
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };
    const fileProp = {
      name: 'file',
      action: uploadFileUrl,
      listType: 'picture',
      onChange: this.onUploadCover.bind(this)
    }
    const {getFieldDecorator} = this.props.form;
    const {imgUrl} = this.props.home;
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
          {getFieldDecorator('imgUrl',{rules:[{
            required:true,
            message:'必须上传图标'
          }]})(<Input style={{display: 'none'}}/>)}
          <Upload {...fileProp} disabled={!(imgUrl == null || imgUrl == '')}>
            <Button type='ghost'>
              <Icon type='upload'/> 点击上传
            </Button>
          </Upload>
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
