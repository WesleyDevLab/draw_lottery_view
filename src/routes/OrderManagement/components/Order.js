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
import {Table,AutoComplete} from 'antd';
import fetch from './../../../components/getFetch';

const {Column} = Table;
const getUrl = 'order/all';
const keysUrl = 'order/keys';

class Order extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.pullData();
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

  getKeys(value) {
    fetch(keysUrl + '?key=' + value, this.changeKeys(value).bind(this));
  }

  render() {
    const {source,keys} = this.props.home;
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
          <Column title="中奖用户id" dataIndex="luckUserAccountId" key="luckUserAccountId"/>
          <Column title="商品期数" dataIndex="roundTime" key="roundTime"/>
          <Column title="商品名称" dataIndex="commodityName" key="commodityName"/>
          <Column title="兑奖方式" dataIndex="exchangeWayLabel" key="exchangeWayLabel"/>
          <Column title="商品属性" dataIndex="genre" key="genre" render={(t,r)=>(r.genreLabel)}/>
          <Column title="状态" dataIndex="exchangeState" key="exchangeState" render={(text,record)=>(record.exchangeStateLabel)}/>
          <Column title="备注" dataIndex="cardNotEnough" key="cardNotEnough"
                  render={(t,r) => {
                    const text = r.cardNotEnoughLabel;
                    return text == null ? '' : <span style={{color: 'red'}}>{text}</span>
                  }}/>
          <Column title="操作" render={(text, record, index) => {
            const {exchangeWay} = record;
            const opts = [];
            opts.push(<a key='1'>详情</a>);
            opts.push(<span className="ant-divider" key='2'/>);
            if (exchangeWay == 1 || exchangeWay == 2){
              opts.push(<a key='3'>发货</a>);
              opts.push(<span key='4' className="ant-divider"/>)
            }
            if (exchangeWay == 5){
              opts.push(<a key='5'>追踪</a>);
              opts.push(<span key='6' className="ant-divider"/>)
            }
            opts.push(<a key='7'>修改</a>);
            opts.push(<span className="ant-divider" key='8'/>);
            opts.push(<a key='9'>删除</a>);
            return opts;
          }}/>
        </Table>
      </div>
    )
  }
}

export default Order;
