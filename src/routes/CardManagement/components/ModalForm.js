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

import {Form, Select, Input, message} from 'antd'
const Item = Form.Item;
const Option = Select.Option;
const addUrl = 'commodity/addCard';
import fetch from './../../../components/getFetch'
class _from extends Component {

  handleSubmit() {
    const {after} = this.props;
    const {validateFields,resetFields,getFieldsValue} = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        fetch(addUrl, data => {
          message.success(data.message);
          resetFields();
          after();
        }, {data: getFieldsValue()})
      }
    });
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
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };
    const shortStyle = {
      width: 200
    };

    const {getFieldDecorator} = this.props.form;
    const {submit} = this.props;
    if(submit)
      this.handleSubmit();
    return (
      <Form>
        <Item {...formItemLayout} label={'运营商'}>
          {getFieldDecorator('corporation', {
            initialValue: '0',
            rules: [{
              required: true,
              message: '请选择运营商'
            }]
          })(
            <Select>
              <Option value={'0'}>移动</Option>
              <Option value={'1'}>联通</Option>
              <Option value={'2'}>电信</Option>
            </Select>
          )}
        </Item>
        <Item  {...formItemLayout} label={'金额'}>
          {getFieldDecorator('money', {
            initialValue: '10',
            rules: [{
              required: true,
              message: '请选择金额'
            }]
          })(
            <Select>
              <Option value={'10'}>10元</Option>
              <Option value={'30'}>30元</Option>
              <Option value={'50'}>50元</Option>
              <Option value={'100'}>100元</Option>
            </Select>
          )}
        </Item>
        <Item  {...formItemLayout} label={'卡号'}>
          {getFieldDecorator('cardNum',{
            rules: [{
              required: true,
              message: '请输入卡号'
            }]
          })(
            <Input/>
          )}
        </Item>
        <Item  {...formItemLayout} label={'密码'}>
          {getFieldDecorator('password',{
            rules: [{
              required: true,
              message: '请输入密码'
            }]
          })(
            <Input/>
          )}
        </Item>

      </Form>
    )
  }
}

export default Form.create()(_from);
