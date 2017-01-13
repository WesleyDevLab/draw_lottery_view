/**
 * 商品管理
 * draw_lottery Commodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-08 23:11:52
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 *
 */

import React, {Component} from 'react'
import fetch from './../../../components/getFetch'
const commodity = 'commodity'
const filtersUrl = 'commodity/filters';
const keysUrl = 'commodity/keys';
import Tools from './Tools'
import {Table, AutoComplete, Button} from 'antd';
import {Link} from 'react-router'

const columns = [{
  title: '编号',
  dataIndex: 'id',
  sorter: true,
}, {
  title: '期数',
  dataIndex: 'roundTime',
}, {
  title: '名称',
  dataIndex: 'name',
}, {
  title: '属性',
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
  title: '分类',
  dataIndex: 'typeName',
}, {
  title: '状态',
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
  title: '点击量',
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
/*
 , {
 title: '操作',
 key: 'action',
 fixed: 'right',
 width: 200,
 render: (text, record) => (
 <span>
 <Link href='#'>详情</Link>
 <span className="ant-divider" />
 <Link href='#'>设置</Link>
 <span className="ant-divider" />
 <Link href='#'>修改</Link>
 <span className="ant-divider" />
 <Link href='#'>删除</Link>
 <span className="ant-divider" />
 <Link href='#'>下架</Link>
 </span>
 ),
 }

 */

class Commodity extends Component {
  componentDidMount() {
    this.loadFilters();
    this.loadData();
  }

  render() {
    const {data, loading, keys, choose, tableState} = this.props.home;
    return (
      <div>
        <div className="mine-row">

          <Button type={'primary'}><Link to='/commodityManagement/add'>添加模板</Link></Button>
          <span className="ant-divider"/>
          <Button type={'primary'}><Link to='/commodityManagement/templates'>管理模板</Link></Button>
        </div>

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
          /><span className="ant-divider"/><Tools keys={choose} callback={() => {
          if (tableState.page == null) {
            this.loadData();
          } else
            this.loadData(tableState, tableState.page.current);
        }}/>
        </div>
        <Table columns={columns}
               dataSource={data.list}
               rowKey={'id'}
               pagination={data}
               rowSelection={this.selections()}
               loading={loading}
               bordered
               onChange={this.handleTableChange.bind(this)}
        />
      </div>
    )
  }

  selections() {
    const {onChoose} = this.props;
    return {
      onChange: (selectedRowKeys, selectedRows) => {
        onChoose(selectedRowKeys);
      }
    };
  }

  getKeys(value) {
    fetch(keysUrl + '?key=' + value, this.changeKeys(value).bind(this));
  }

  changeKeys(value) {

    return data => {
      const {showComplete} = this.props;
      const loadData = this.loadData.bind(this);
      loadData({
        key: value
      });
      if (!value) {
        showComplete([]);
        return;
      }
      if (data.length > 1 && value != data[0])
        showComplete([]);
      else
        showComplete(data);
    }
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


    const {saveTableState} = this.props;
    const tableState = {
      type: filters.typeName,
      state: filters.stateName,
      genre: filters.genre,
      ...sort
    };
    saveTableState(Object.assign({}, tableState, {page: pagination}));
    this.loadData(tableState, pagination.current);
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

}

export default Commodity;
