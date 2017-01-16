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
  message
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import fetch from './../../../components/getFetch'
import {STATIC_SERVE_PATH} from '../../../constants'
const genresSource = [{id: 0, name: '虚拟'}, {id: 1, name: '实体'}, {id: 2, name: '实体不可快递'}];
const typesUrl = 'commodity/allType';
const uploadFileUrl = STATIC_SERVE_PATH + '/commodity/uploadImage';
const addUrl = '/commodity/save';
export class _form extends Component {
  handleMinimumChange(value) {
    const {getFieldValue} = this.props.form;
    const total = getFieldValue('buyTotalNumber') || value;
    const minimum = getFieldValue('minimum') || value;
    console.log(total, minimum);
    if (total % minimum != 0) {
      Modal.error({
        title: '错误输入',
        content: '最低购买量应该能够被总需整除',
      });
      return false;
    }
    return true;
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadType} = this.props;
    fetch(typesUrl, loadType);
  }

  handleSubmit(e) {
    e.preventDefault();



    let values = this.props.form.getFieldsValue();
    const {coverUrl} = this.props.home;
    if (coverUrl == null) {
      message.error('你还没有上传封面图片');
      return false;
    }

    values.coverImgUrl = coverUrl;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = this.props.form.getFieldsValue();
        const {images} = this.props.home;
        if (images.length > 0) {
          const imgs = [];
          images.map((item, index) => {
            imgs.push(item.url);
          })
          data.images = imgs;
        }
        fetch(addUrl, data => message.success(data.message), {data: data})
      }
    });
  }

  onUploadCover(info) {
    const {saveCoverImgUrl} = this.props;
    if (info.file.status === 'done') {
      saveCoverImgUrl(info.file.response.data);
      message.success(info.file.response.message);
    } else if (info.file.status === 'error') {
      message.error(info.file.response.message);
    }
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

  handleChangeImages(info) {
    let fileList = info.fileList;
    console.log(info);
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    //fileList = fileList.slice(-2);

    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.data;
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.success === true;
      }
      return true;
    });
    console.log(fileList);
    const {saveImages} = this.props;
    saveImages(fileList);
  }

  render() {
    const {typeSources, panels} = this.props.home;
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

    const fileProp = {
      name: 'file',
      action: uploadFileUrl,
      listType: 'picture',
      onChange: this.onUploadCover.bind(this)
    }


    const {coverUrl, images} = this.props.home;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <FormItem label={'商品名称'} hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{
              required: true,
              message: '请输入商品名称'
            }]
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
        <FormItem lable={'虚拟产品'}  {...tailFormItemLayout}>
          {getFieldDecorator('sendCard', {
            valuePropName: 'checked',
          })(
            <Checkbox onChange={this.handleChangeCard.bind(this)}>是否发卡</Checkbox>
          )}
        </FormItem>
        {!panels.second ? <div/> : <div>
            <FormItem label={'卡类型'} {...formItemLayout}>
              {getFieldDecorator('cardType', {
                rules: [{
                  required: true,
                  message: '请输入发卡类型'
                }]
              })(<Select
                showSearch
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
            <FormItem label={'发卡金额'} {...formItemLayout} hasFeedback>
              {getFieldDecorator('cardMoney', {
                rules: [{
                  required: true,
                  message: '请输入发卡金额'
                }]
              })(<InputNumber/>)}
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
              message: '请输入图文详情'
            }],
            initialValue: coverUrl
          })(<Input style={{display: 'none'}}/>)}
          <Upload {...fileProp} disabled={!(coverUrl == null || coverUrl == '')}>
            <Button type='ghost'>
              <Icon type='upload'/> 点击上传
            </Button>
          </Upload>
        </FormItem>
        <FormItem label={'商品图片'}
                  {...formItemLayout}
                  hasFeedback>
          {getFieldDecorator('imaddd',{rules:[{
            required:true,
            message:'',
          }]})(<Upload action={uploadFileUrl}
                       onChange={this.handleChangeImages.bind(this)}
                       multiple={true}
                       fileList={images}
                       listType="picture">
            <Button type='ghost'>
              <Icon type='upload'/> 点击上传
            </Button>
          </Upload>)}
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
            initialValue: false,
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
