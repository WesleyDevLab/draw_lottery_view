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
import {Table} from 'antd'
import fetch from './../../../components/getFetch'
const getCardsUrl = '/getCards';
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
export default class CardManagement extends Component {
  componentDidMount() {
    this.loadData();
  }

  loadData(params = {}, p = 1) {
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

  render() {
    const {source} = this.props.home;
    return (<Table columns={columns}
                   dataSource={source.list}
                   rowKey={'id'}
                   pagination={source}
                   rowSelection={this.selections()}
                   bordered
                   onChange={this.handleTableChange.bind(this)}
    />)
  }
}
