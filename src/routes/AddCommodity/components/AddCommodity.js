/**
 * 添加商品页面
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $Id$
 * @link <a>https://userwu.github.io/</a>
 *
 */
import React, {Component} from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Upload,
  DatePicker,
  InputNumber,
  Modal,
  message,
} from 'antd';
import fetch from './../../../components/getFetch'
import {STATIC_SERVE_PATH} from '../../../constants'
import RichText from './../../../components/RichText'

const FormItem = Form.Item;
const Option = Select.Option;
const genresSource = [{id: 0, name: '虚拟'}, {id: 1, name: '实体'}, {id: 2, name: '实体不可快递'}];
const typesUrl = 'commodity/allType';
const uploadFileUrl = STATIC_SERVE_PATH + '/commodity/uploadImage';
const addUrl = '/commodity/save';
const ButtonGroup = Button.Group;
export class _form extends Component {
  handleMinimumChange(value) {
    const {getFieldValue} = this.props.form;
    const total = getFieldValue('buyTotalNumber') || value;
    const minimum = getFieldValue('minimum') || value;
    if (total % minimum != 0) {
      Modal.error({
        title: '错误输入',
        content: '最低购买量应该能够被总需整除',
      });
      return false;
    }
    return true;
  };

  componentWillMount() {
    this.init();
  }

  componentDidMount() {
    const {loadType} = this.props;
    fetch(typesUrl, loadType);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {validateFields, resetFields, getFieldsValue, getFieldValue} = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        let data = getFieldsValue();
        data.coverImgUrl = getFieldValue('coverImgUrl').file.url;
        const images = getFieldValue('images').fileList;
        if (images.length > 0) {
          const imgs = [];
          images.map((item, index) => {
            imgs.push(item.url);
          })
          data.images = imgs;
        }
        fetch(addUrl, data => {
          message.success(data.message);
          this.init();
        }, {data: data})
      }
    });
  }

  /**
   * 封面图片处理
   * @param info
   */
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
    const {saveCoverImage} = this.props;
    saveCoverImage(fileList);
  }

  handleChangeCard(e) {
    const {panels} = this.props.home;
    const {showPanel} = this.props;
    panels.second = e.target.checked == true;
    showPanel(panels);
  }

  handleChooseGenre(value) {
    const {panels} = this.props.home;
    const {showPanel} = this.props;

    panels.first = value == '2';
    showPanel(panels);
  }

  handleChangWin(e) {
    const {panels} = this.props.home;
    const {showPanel} = this.props;
    panels.third = e.target.checked == true;
    showPanel(panels);
  }

  handleChangeExchange(e) {
    const {panels} = this.props.home;
    const {showPanel} = this.props;
    panels.four = e.target.checked == true;
    showPanel(panels);
  }

  /**
   * 商品图片banner处理
   * @param info
   */
  handleChangeImages(info) {
    let fileList = info.fileList;
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
    const {saveImages} = this.props;
    saveImages(fileList);
  }

  init() {
    const {resetFields,} = this.props.form;
    resetFields();
    const {resetForm} = this.props;
    resetForm();
  }

  render() {
    const {typeSources, panels, coverImg} = this.props.home;
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


    const {coverUrl, images} = this.props.home;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <FormItem label={'商品名称'} hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{
              required: true,
              message: '请输入商品名称'
            }, {
              max: 50,
              message: '最大50个字符',
            }],

          })(<Input/>)}
        </FormItem>
        <FormItem label={'商品分类'} {...formItemLayout}>
          {getFieldDecorator('type', {
            rules: [{
              required: true,
              message: '请输入商品分类'
            }]
          })(<Select
            style={shortStyle}
            placeholder='选择分类'
          >
            {typeSources.map(item => (
              <Option value={item.id + ''} key={'' + item.id}>{item.name}</Option>
            ))}
          </Select>)}
        </FormItem>
        <FormItem label={'商品属性'} {...formItemLayout}>
          {getFieldDecorator('genre', {
            rules: [{
              required: true,
              message: '请输入商品属性'
            }]
          })(<Select
            placeholder='选择属性'
            onChange={this.handleChooseGenre.bind(this)}
            style={shortStyle}
          >
            {genresSource.map(item => <Option key={'' + item.id} value={item.id + ''}>{item.name}</Option>)}
          </Select>)}
        </FormItem>
        {!panels.first ? <div/> : (<div><FormItem label={'领奖联系人'} hasFeedback {...formItemLayout}>
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
            </FormItem></div>)}
        <FormItem label={''}  {...tailFormItemLayout}>
          {getFieldDecorator('express', {
            valuePropName: 'checked',
          })(
            <Checkbox>快递收货</Checkbox>
          )}
        </FormItem>
        <FormItem lable={'虚拟产品'}  {...tailFormItemLayout}>
          {getFieldDecorator('sendCard', {
            valuePropName: 'checked',
          })(
            <Checkbox onChange={this.handleChangeCard.bind(this)}>是否发卡</Checkbox>
          )}
        </FormItem>
        {!panels.second ? '' : <div>
            <FormItem label={'卡类型'} {...formItemLayout}>
              {getFieldDecorator('cardType', {
                rules: [{
                  required: true,
                  message: '请输入发卡类型'
                }]
              })(<Select
                style={shortStyle}
                placeholder='选择类型'
                optionFilterProp='children'
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value='0'>移动</Option>
                <Option value='1'>联通</Option>
                <Option value='2'>电信</Option>
              </Select>)}
            </FormItem>
            <FormItem label={'发卡数量'} {...formItemLayout} hasFeedback>
              {getFieldDecorator('cardNum', {
                rules: [{
                  required: true,
                  message: '请输入发卡数量'
                }]
              })(<InputNumber/>)}
            </FormItem>
            <FormItem label={'发卡金额'} {...formItemLayout}>
              {getFieldDecorator('cardMoney', {
                rules: [{
                  required: true,
                  message: '请输入发卡金额'
                }]
              })(<Select style={shortStyle}>
                <Option value='10'>10元</Option>
                <Option value='30'>30元</Option>
                <Option value='50'>50元</Option>
                <Option value='100'>100元</Option>
              </Select>)}
            </FormItem>
          </div>}
        <FormItem  {...tailFormItemLayout}>
          {getFieldDecorator('withdrawals', {
            valuePropName: 'checked',
            initialValue: false,
          })(
            <Checkbox onChange={this.handleChangWin.bind(this)}>是否支持提现</Checkbox>
          )}
        </FormItem>
        {!panels.third ? <div/> : <FormItem label={'提现金额'} {...formItemLayout} hasFeedback>
            {getFieldDecorator('withdrawalsMoney', {
              rules: [{
                required: true,
                message: '请输入提现金额'
              }]
            })(<InputNumber/>)}
          </FormItem>}
        <FormItem  {...tailFormItemLayout}>
          {getFieldDecorator('exchangeable', {
            valuePropName: 'checked',
          })(
            <Checkbox onChange={this.handleChangeExchange.bind(this)}>是否支持折换闪币</Checkbox>
          )}
        </FormItem>
        {!panels.four ? <div/> : <FormItem label={'折换金额'}  {...formItemLayout}>
            {getFieldDecorator('exchangeMoney', {
              rules: [{
                required: true,
                message: '请输入折换金额'
              }]
            })(<InputNumber/>)}
          </FormItem>}
        <FormItem label={'商品封面'} {...formItemLayout} hasFeedback>
          {getFieldDecorator('coverImgUrl', {
            rules: [{
              required: true,
              message: '请上传封面'
            }]
          })(<Upload name="file"
                     action={uploadFileUrl}
                     listType="picture"
                     onChange={this.onUploadCover.bind(this)}
                     fileList={coverImg}>
            <Button type='ghost'>
              <Icon type='upload'/> 点击上传
            </Button>
          </Upload>)}

        </FormItem>
        <FormItem label={'商品图片'}
                  {...formItemLayout}
                  hasFeedback>
          {getFieldDecorator('images', {
            rules: [{
              required: true,
              message: '请上传商品图片',
            }]
          })(<Upload action={uploadFileUrl}
                     onChange={this.handleChangeImages.bind(this)}
                     multiple={true}
                     fileList={images}
                     listType="picture">
            <Button type='ghost'>
              <Icon type='upload'/> 点击上传
            </Button>
          </Upload>)}
        </FormItem>
        <FormItem label={'商品图文'} labelCol={{span: 6}} wrapperCol={{span: 18}} hasFeedback>
          {getFieldDecorator('content', {
            rules: [{
              required: true,
              message: '请输入图文详情'
            }],
            valuePropName: 'content',
            initialValue: '<p><br></p>',
          })(<RichText id="editor1"/>)}
        </FormItem>
        <div><Button type="primary" onClick={this.init.bind(this)}>初始化</Button><span className="ant-divider"/>
          <Button type="primary" onClick={(e)=>{
            const {getFieldValue} = this.props.form;
            console.warn(getFieldValue('content'))
          }}>输出值</Button></div>
        <FormItem  {...tailFormItemLayout}>
          {getFieldDecorator('easyWinning', {
            valuePropName: 'checked',
            initialValue: false,
          })(
            <Checkbox>高中奖率</Checkbox>
          )}
        </FormItem>
        <FormItem label={'总需'} {...formItemLayout}>
          {getFieldDecorator('buyTotalNumber', {
            rules: [{
              required: true,
              message: '请输入总需人数'
            }],
            trigger: 'onChange',
          })(<InputNumber onBlur={this.handleMinimumChange.bind(this)}/>)}<span>人次</span>
        </FormItem>
        <FormItem label={'最低购买数'}  {...formItemLayout}>
          {getFieldDecorator('minimum', {
            rules: [{
              required: true,
              message: '请输入最低购买人数'
            }],
            trigger: 'onChange',
            initialValue: 1,
          })(<InputNumber onBlur={this.handleMinimumChange.bind(this)}/>)}
          <span>人次</span>
        </FormItem>
        <FormItem   {...tailFormItemLayout}>
          {getFieldDecorator('autoRound', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>自动下一期</Checkbox>)}
        </FormItem>
        <FormItem label={'设置开奖时间（分钟）'}  {...formItemLayout} hasFeedback>
          {getFieldDecorator('openTime')(<InputNumber/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='上架时间'
          extra="若不设置将立即上架"
        >
          {getFieldDecorator('groundTime')(
            <DatePicker showTime format='YYYY-MM-DD HH:mm:ss'/>
          )}
        </FormItem>
        <FormItem wrapperCol={{span: 8, offset: 4}}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const AddCommodity = Form.create()(_form);
export default AddCommodity;
