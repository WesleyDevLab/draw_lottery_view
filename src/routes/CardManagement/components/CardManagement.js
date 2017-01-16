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
import {Table, Button, Modal, message,Form, Select, Input} from 'antd'
const Item = Form.Item;
const Option = Select.Option;
import fetch from './../../../components/getFetch'
const getCardsUrl = 'commodity/getCards';
const [addUrl, deleteUrl, updateUrl] = ['commodity/addCard', 'commodity/deleteCards', 'commodity/updateCard'];
const columns = [{
  title: '编号',
  dataIndex: 'id',
  sorter: true,
}, {
  title: '卡号',
  dataIndex: 'cardNum',
}, {
  title: '密码',
  dataIndex: 'password',
}, {
  title: '运营商',
  dataIndex: 'corporation',
  filters: [
    {
      text: '移动',
      value: 0
    },
    {
      text: '联通',
      value: 1
    },
    {
      text: '电信',
      value: 2
    }
  ],
  render: genre => {
    switch (genre) {
      case 0:
        return '移动';
      case 1:
        return '联通';
      case 2:
        return '电信';
    }
  }
}];
class CardManagement extends Component {
  componentDidMount() {
    this.loadData();
  }

  loadData(params = {}, p = 1) {
    console.log('load');
    const {showLoading, showData} = this.props;
    showLoading();
    fetch(getCardsUrl + '?p=' + p, showData, {
      data: params
    });
  }

  handleTableChange(pagination, filters, sorter) {
    let order = 0;
    switch (sorter.field) {
      case 'cardNum':
        order = 1;
        break;
      default:
        order = 0;
    }
    let sort = {
      order: order,
      direction: sorter.order == 'ascend' ? 1 : 0
    };
    const tableState = {
      corporation: filters.corporation,
      ...sort
    };
    this.loadData(tableState, pagination.current);
  }

  selections() {
    const {onChoose} = this.props;
    return {
      onChange: (selectedRowKeys, selectedRows) => {
        onChoose(selectedRowKeys);
      }
    };
  }

  add() {

  }

  delete() {
    const {keys, callback} = this.props;
    if (keys != null)
      fetch(deleteUrl, (data) => {
        if (data.success) {
          message.success(data.message);
          callback();
        } else
          message.error(data.message);
      }, {data: keys});
  }

  update() {
    const {keys, callback} = this.props;
    if (keys != null)
      fetch(updateUrl, (data) => {
        if (data.success) {
          message.success(data.message);
          callback();
        } else
          message.error(data.message);
      }, {data: keys});
  }

  toAdd() {
    const {showModal} = this.props;
    showModal({title: '添加卡密'});
  }

  handleOk() {
    const {showConfirm} = this.props;
    showConfirm();
    this.handleSubmit();
  }

  handleCancel() {
    const {hideModal} = this.props;
    hideModal();
  }

  after() {
    const {hideConfirm} = this.props;
    hideConfirm();
    this.loadData();
  }

  handleSubmit() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch(addUrl, data => {
          message.success(data.message);
          this.after();
        }, {data: this.props.form.getFieldsValue()})
      }
    });
  }

  render() {
    const {source} = this.props.home;
    const {visible, confirmLoading, modalSource} = this.props.home;
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
    return (
      <div>
        <div className="mine-row">
          <span>
        <Button onClick={this.toAdd.bind(this)}>增加</Button>
      <span className="ant-divider"/>
      <Button onClick={this.delete.bind(this)}>删除</Button>
        <span className="ant-divider"/>
        <Button onClick={this.update.bind(this)}>修改</Button>
      </span>
        </div>
        <Table columns={columns}
               dataSource={source.list}
               rowKey={'id'}
               pagination={source}
               rowSelection={this.selections()}
               bordered
               onChange={this.handleTableChange.bind(this)}
        />
        <Modal title={modalSource.title}
               visible={visible}
               onOk={this.handleOk.bind(this)}
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel.bind(this)}
        >
          <Form onSubmit={this.handleSubmit.bind(this)}>
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
              {getFieldDecorator('cardNum', {
                rules: [{
                  required: true,
                  message: '请输入卡号'
                }]
              })(
                <Input/>
              )}
            </Item>
            <Item  {...formItemLayout} label={'密码'}>
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: '请输入密码'
                }]
              })(
                <Input type="password"/>
              )}
            </Item>

          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(CardManagement);
