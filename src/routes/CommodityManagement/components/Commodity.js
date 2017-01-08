/**
 * 商品管理
 * draw_lottery Commodity.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-08 23:11:52
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

import React, { Component } from 'react'
import fetch from './../../../components/getFetch'
const commodity = 'commodity'
const filtersUrl = 'commodity/filters';
import { Table } from 'antd';

const columns = [{
  title: '商品编号',
  dataIndex: 'id',
  sorter: true,
}, {
  title: '商品期数',
  dataIndex: 'roundTime',
}, {
  title: '商品名称',
  dataIndex: 'name'
}, {
  title: '商品属性',
  dataIndex: 'genre',
  filters: [
    {
      text: '虚拟',
      value: 0
    },
    {
      text: '实体',
      value: 1
    },
    {
      text: '实体不可快递',
      value: 2
    }
  ],
  render: genre => {
    switch (genre) {
      case 0:
        return '虚拟';
      case 1:
        return '实体';
      case 2:
        return '实体不可快递';
    }
  }
}, {
  title: '商品分类',
  dataIndex: 'typeName'
}, {
  title: '商品状态',
  dataIndex: 'stateName',
}, {
  title: '上架时间',
  dataIndex: 'groundTimeLabel',
  sorter: true,
}, {
  title: '下架时间',
  dataIndex: 'undercarriageTimeLabel',
  sorter: true,
  render: (text) => ((text == null || text == '') ? '暂无记录' : text)
}, {
  title: '商品点击量',
  dataIndex: 'viewNum',
  sorter: true,
}, {
  title: '总需',
  dataIndex: 'buyTotalNumber',
  sorter: true,
}, {
  title: '已售',
  dataIndex: 'buyCurrentNumber',
  sorter: true,
}, {
  title: '剩余',
  dataIndex: 'buyNowNumber',
  sorter: true,
}];

class Commodity extends Component {
  componentDidMount() {
    this.loadFilters();
    this.loadData();
  }
  handleTableChange(pagination, filters, sorter) {
    let order = 0;
    switch (sorter.field) {
      case 'groundTime':
        order = 1;
        break;
      case 'undercarriageTime':
        order = 2;
        break;
      case 'buyTotalNumber':
        order = 3;
        break;
      case 'buyCurrentNumber':
        order = 4;
        break;
      case 'buyNowNumber':
        order = 5;
        break;
      case 'viewNum':
        order = 6;
        break;
      default:
        order = 0;
    }
    let sort = {
      order: order,
      direction: sorter.order == 'ascend' ? 1 : 0
    };
    console.log(sort, filters);
    this.loadData({
      type: filters.typeName,
      state: filters.stateName,
      genre: filters.genre,
      ...sort
    }, pagination.current);
  }
  loadData(params = {}, p = 1) {
    const {showLoading, showTable} = this.props;
    showLoading();
    fetch(commodity + '?p=' + p, showTable, {
      data: params
    });
  }
  loadFilters() {
    fetch(filtersUrl, (data) => {
      columns[4].filters = [];
      columns[5].filters = [];

      data.types.map((item, index) => {
        columns[4].filters.push({
          text: item.name,
          value: item.id
        });
      });
      data.states.map((item, index) => {
        columns[5].filters.push({
          text: item.name,
          value: item.id
        });
      });
    })
  }
  render() {
    const {data, loading} = this.props.home;
    return <Table columns={columns}
      dataSource={data.list}
      rowKey={'id'}
      pagination={data}
      loading={loading}
      onChange={this.handleTableChange.bind(this)}
      />
  }
}

export default Commodity;
