/**
 * 添加商品页面
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 *
 */
import React, {Component} from 'react'
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Upload, DatePicker} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import fetch from './../../../components/getFetch'

const typesUrl = 'commodity/allType';
export class _form extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadType} = this.props;
    fetch(typesUrl, loadType);
  }

  handleSubmit() {
  }

  render() {
    const {typeSources} = this.props.home;
    const {getFieldDecorator} = this.props.form;
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
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label={'商品名称'} hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{
              required: true,
              message: '请输入商品名称'
            }]
          })(<Input/>)}
        </FormItem>
        <FormItem label={'商品分类'} hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            rules: [{
              required: true,
              message: '请输入商品分类'
            }]
          })(<Select
            showSearch
            style={shortStyle}
            placeholder="选择分类"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {typeSources.map(item => {
              console.log(item);
              return <Option value={item.id}>{item.name}</Option>
            })}
          </Select>)}
          <Button icon={'plus-circle-o'} style={{
            position: 'absolute',
            right: 100
          }}>添加分类</Button>
        </FormItem>
        <FormItem label={'商品属性'} {...formItemLayout}>
          {getFieldDecorator('genre', {
            rules: [{
              required: true,
              message: '请输入商品属性'
            }]
          })(<Select
            showSearch
            placeholder="选择属性"
            style={shortStyle}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>)}
        </FormItem>
        <FormItem label={'领奖联系人'} hasFeedback {...formItemLayout}>
          {getFieldDecorator('contactName', {
            rules: [{
              required: true,
              message: '请输入联系人姓名'
            }]
          })(<Input/>)}
        </FormItem>
        <FormItem label={'领奖电话'} hasFeedback {...formItemLayout}>
          {getFieldDecorator('contactPhone', {
            rules: [{
              required: true,
              message: '请输入联系人电话'
            }]
          })(<Input/>)}
        </FormItem>
        <FormItem label={'领奖地址'} hasFeedback {...formItemLayout}>
          {getFieldDecorator('contactAddress', {
            rules: [{
              required: true,
              message: '请输入领奖地址'
            }]
          })(<Input/>)}
        </FormItem>
        <FormItem lable={'虚拟产品'}  {...tailFormItemLayout}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>是否发卡</Checkbox>
          )}
        </FormItem>
        <FormItem label={'卡类型'} {...formItemLayout} hasFeedback>
          {getFieldDecorator('cardType', {
            rules: [{
              required: true,
              message: '请输入发卡类型'
            }]
          })(<Select
            showSearch
            style={shortStyle}
            placeholder="选择类型"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>)}
        </FormItem>
        <FormItem label={'发卡数量'} {...formItemLayout} hasFeedback>
          {getFieldDecorator('cardNum', {
            rules: [{
              required: true,
              message: '请输入发卡数量'
            }]
          })(<Input/>)}
        </FormItem>
        <FormItem label={'发卡金额'} {...formItemLayout} hasFeedback>
          {getFieldDecorator('cardMoney', {
            rules: [{
              required: true,
              message: '请输入发卡金额'
            }]
          })(<Input/>)}
        </FormItem>
        <FormItem  {...tailFormItemLayout} hasFeedback>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>是否支持提现</Checkbox>
          )}
        </FormItem>
        <FormItem label={'提现金额'} {...formItemLayout} hasFeedback>
          {getFieldDecorator('withdrawals')(<Input/>)}
        </FormItem>
        <FormItem  {...tailFormItemLayout}>
          {getFieldDecorator('exchangable', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>是否支持折换闪币</Checkbox>
          )}
        </FormItem>
        <FormItem label={'折换金额'}  {...formItemLayout}>
          {getFieldDecorator('exchangeMoney')(<Input/>)}
        </FormItem>
        <FormItem label={'商品封面'} {...formItemLayout} hasFeedback>
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            normalize: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}>
              <Button type="ghost">
                <Icon type="upload"/> Click to upload
              </Button>
            </Upload>
          )}
        </FormItem>
        <FormItem label={'商品图文'} {...formItemLayout} hasFeedback>
          {getFieldDecorator('content', {
            rules: [{
              required: true,
              message: '请输入图文详情'
            }]
          })(<Input type={'textarea'} rows={3}/>)}
        </FormItem>
        <FormItem  {...tailFormItemLayout}>
          {getFieldDecorator('esayWinning', {
            valuePropName: 'checked',
            initialValue: false,
          })(
            <Checkbox>高中奖率</Checkbox>
          )}
        </FormItem>
        <FormItem label={'总需'} {...formItemLayout} hasFeedback>
          {getFieldDecorator('buyTotalNumber', {
            rules: [{
              required: true,
              message: '请输入总需人数'
            }],
          })(<Input/>)}
        </FormItem>
        <FormItem label={'最低购买数'}  {...formItemLayout} hasFeedback>
          {getFieldDecorator('minimum', {
            rules: [{
              required: true,
              message: '请输入总需人数'
            }],
            initialValue: '1',
          })(<Input/>)}
        </FormItem>
        <FormItem   {...tailFormItemLayout}>
          {getFieldDecorator('auto_round', {
            valuePropName: 'checked',
            initialValue: false,
          })(<Checkbox>自动下一期</Checkbox>)}
        </FormItem>
        <FormItem label={'设置开奖时间（分钟）'}  {...formItemLayout} hasFeedback>
          {getFieldDecorator('openTime')(<Input/>)}
        </FormItem>
        <FormItem
          {...formItemLayout} hasFeedback
          label="上架时间"
        >
          {getFieldDecorator('date-time-picker', {
            rules: [{
              type: 'object',
              required: true,
              message: 'Please select time!'
            }]
          })(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
          )}
        </FormItem>
      </Form>
    )
  }
}

const AddCommodity = Form.create({
  onFieldsChange: (props, fields) => {
    console.log(props, fields)
  },
  mapPropsToFields: (props) => {
  }
})(_form);
export default AddCommodity;
