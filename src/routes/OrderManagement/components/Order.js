/**
 * 订单管理。其实是历史管理= =.
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version $
 * @link <a>https://userwu.github.io/</a>
 *
 */
import React, {Component} from 'react'
import {Table, AutoComplete, Modal, message, Form, Input} from 'antd';
import fetch from './../../../components/getFetch';

const Item = Form.Item;
const {Column} = Table;
const getUrl = 'order/all';
const keysUrl = 'order/keys';
const filtersUrl = 'order/filters';
const detailsUrl = 'order/details';
const deliveryUrl = 'order/delivery';
const deleteUrl = 'order/delete';
const DetailForm = (props) => {
  const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 14
    },
  };
  const details = props.datasource;
  if (details == null) {
    return <div>没有数据</div>
  }
  return <Form>
    <Item label="快递公司" key="deliveryName" {...formItemLayout}>
      <Input value={details.deliveryName} disabled/>
    </Item>
    <Item label="快递单号" key="deliveryNumber" {...formItemLayout}>
      <Input value={details.deliveryNumber} disabled/>
    </Item>
    <Item label="收货人" key="receiverName" {...formItemLayout}>
      <Input value={details.receiverName} disabled/>
    </Item>
    <Item label="收货电话" key="receiverPhone" {...formItemLayout}>
      <Input value={details.receiverPhone} disabled/>
    </Item>
    <Item label="收货地址" key="address" {...formItemLayout}>
      <Input value={details.address} type="textarea" disabled/>
    </Item>

  </Form>
};

const DeliveryForm = Form.create()((props) => {
  const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 14
    },
  };
  const {visible, onCancel, onCreate, form} = props;
  const {getFieldDecorator} = form;
  return (
    <Modal visible={visible}
           title="输入收货地址"
           okText="提交"
           onCancel={onCancel}
           onOk={onCreate}>
      <Form>
        <Item label="快递公司" key="_deliveryName" {...formItemLayout}>
          {getFieldDecorator('deliveryName', {
            rules: [{required: true, message: '请输入快递公司!'}],
          })(
            <Input />
          )}
        </Item>
        <Item label="快递单号" key="_deliveryNumber" {...formItemLayout}>
          {getFieldDecorator('deliveryNumber', {
            rules: [{required: true, message: '请输入快递单号!'}],
          })(
            <Input />
          )}
        </Item>
        <Item label="备注" key="note" {...formItemLayout}>
          {getFieldDecorator('note')(
            <Input />
          )}
        </Item>
      </Form>
    </Modal>
  )
});

class Order extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.pullData();
    const {loadFilters} = this.props;
    fetch(filtersUrl, loadFilters);
  }

  handleDetailsOk() {
    const {showDetailsModal} = this.props;
    showDetailsModal(false);
  }

  handleDetailsCancel() {
    const {showDetailsModal} = this.props;
    showDetailsModal(false);
  }

  pullData(param = {}, p = 1) {
    const {showLoading, loadData} = this.props;
    showLoading();
    fetch(getUrl + '?p=' + p, loadData, {data: param});
  }


  changeKeys(value) {

    return data => {
      const {showComplete} = this.props;
      const loadData = this.pullData.bind(this);
      loadData({
        key: value
      });
      if (!value) {
        showComplete([]);
        return;
      }
      if (data.length < 1 && value != data[0])
        showComplete([]);
      else
        showComplete(data);
    }
  }

  handleTableChange(pagination, filters, sorter) {
    let order = 0;
    console.log(filters);
    switch (sorter.field) {
      case 'roundTime':
        order = 2;
        break;
      case 'luckUserAccountId':
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
    this.pullData(tableState, pagination.current);
  }

  getKeys(value) {
    fetch(keysUrl + '?key=' + value, this.changeKeys(value).bind(this));
  }

  handleDelete(id){
    console.log(id);
    fetch(detailsUrl+'?id='+id,(data)=>this.pullData());
  }
  handleDetails(id) {
    const {showDetailsModal, loadDetails} = this.props;
    showDetailsModal(true);
    fetch(detailsUrl + '?id=' + id, (data) => {
      loadDetails(data);
    });
  }

  handleDelivery(id) {
    const {showDeliveryModal,saveDeliveryId} = this.props;
    saveDeliveryId(id);
    showDeliveryModal(true);
  }

  handleDeliveryOk() {
    const {showDeliveryModal} = this.props;
    showDeliveryModal(false);
  }

  handleDeliveryCancel() {
    const {showDeliveryModal} = this.props;
    showDeliveryModal(false);
  }

  saveFormRef(form) {
    this.form = form;
  }

  handleCreate() {
    const form = this.form;
    const {showDeliveryModal} = this.props;
    const getFieldsValue = form.getFieldsValue;
    const {deliveryId} = this.props.home;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let data = getFieldsValue();
      data.id = deliveryId;
      fetch(deliveryUrl, data => {
        message.success(data.message);
        this.init();
      }, {data: data});
      form.resetFields();
      showDeliveryModal(false);
    });
  }

  render() {
    const {source, keys, filters, detailsVisible, details, deliveryVisible} = this.props.home;
    return (
      <div>
        <div className="mine-row">
          <AutoComplete
            dataSource={keys}
            style={{
              width: 200
            }}
            allowClear={true}
            onChange={this.getKeys.bind(this)}
            placeholder="输入商品名..."
            size={'large'}
          />
        </div>
        <Table dataSource={source.list}
               pagination={source}
               bordered
               onChange={this.handleTableChange.bind(this)}>
          <Column title="开奖时间" dataIndex="endTime" key="endTime" render={(text, record) => (record.endTimeLabel)}/>
          <Column title="中奖用户id" dataIndex="luckUserAccountId" key="luckUserAccountId"/>
          <Column title="商品期数" dataIndex="roundTime" key="roundTime" sorter/>
          <Column title="商品名称" dataIndex="commodityName" key="commodityName"/>
          <Column title="兑奖方式" dataIndex="exchangeWayLabel" key="exchangeWayLabel" filters={filters.exchangeWay}/>
          <Column title="商品属性" dataIndex="genre" key="genre" render={(t, r) => (r.genreLabel)} filters={filters.genre}/>
          <Column title="状态" dataIndex="exchangeState" key="exchangeState"
                  render={(text, record) => (record.exchangeStateLabel)} filters={filters.exchangeState}/>
          <Column title="备注" dataIndex="cardNotEnough" key="cardNotEnough"
                  render={(t, r) => {
                    const text = r.cardNotEnoughLabel;
                    return text == null ? '' : <span style={{color: 'red'}}>{text}</span>
                  }} filters={filters.cardNotEnough}/>
          <Column title="操作" key="opts" render={(text, record, index) => {
            const {exchangeWay} = record;
            const opts = [];
            if (exchangeWay == 2) {
              opts.push(<a key='1' onClick={this.handleDetails.bind(this, record.commodityId)}>详情</a>);
              opts.push(<span className="ant-divider" key='2'/>);
            }
            if (exchangeWay == 1 || exchangeWay == 2) {
              opts.push(<a key='3' onClick={this.handleDelivery.bind(this, record.expressId)}>发货</a>);
              opts.push(<span key='4' className="ant-divider"/>)
            }
            if (exchangeWay == 5) {
              opts.push(<a key='5'>追踪</a>);
              opts.push(<span key='6' className="ant-divider"/>)
            }
            opts.pop();
            {/*opts.push(<a key='7'>修改</a>);
            opts.push(<span className="ant-divider" key='8'/>);*/}
            {/*opts.push(<a onClick={this.handleDelete.bind(this,record.commodityId)} key='9'>删除</a>);*/}
            return opts;
          }}/>

        </Table>
        <Modal title="Basic Modal" visible={detailsVisible}
               onOk={this.handleDetailsOk.bind(this)} onCancel={this.handleDetailsCancel.bind(this)}
        >
          <DetailForm datasource={details}/>
        </Modal>
        <DeliveryForm title="发货" visible={deliveryVisible}
                      ref={this.saveFormRef.bind(this)}
                      onCreate={this.handleCreate.bind(this)}
                      onOk={this.handleDeliveryOk.bind(this)}
                      onCancel={this.handleDeliveryCancel.bind(this)}/>
      </div>
    )
  }
}

export default Order;
