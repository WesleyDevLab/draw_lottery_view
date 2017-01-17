/**
 * 模板管理页面
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version
 * @link <a>https://userwu.github.io/</a>
 *
 */
import React, {Component} from 'react';
import fetch from './../../../components/getFetch';
import {Table, AutoComplete, Button} from 'antd';
import {Link} from 'react-router';
import Tools from './Tools';

const loadTempsUrl = 'commodity/temps';
const typesUrl = 'commodity/allType';
const filtersUrl = 'commodity/filters';

const columns = [{
  title: '编号',
  dataIndex: 'id',
  sorter: true,
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
  title: '总需',
  dataIndex: 'buyTotalNumber',
  sorter: true,
}];

export default class Template extends Component {
  componentDidMount() {
    const {loadTypes} = this.props;
    fetch(typesUrl, loadTypes);
    this.loadData();
  }

  handleTableChange(pagination, filters, sorter) {
    let order = 0;
    switch (sorter.field) {
      case 'buyTotalNumber':
        order = 1;
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
      genre: filters.genre,
      ...sort
    };
    saveTableState(Object.assign({}, tableState, {page: pagination}));
    this.loadData(tableState, pagination.current);
  }

  loadFilters() {
    fetch(filtersUrl, (data) => {
      columns[3].filters = [];

      data.types.map((item, index) => {
        columns[3].filters.push({
          text: item.name,
          value: item.id
        });
      });
    })
  }

  loadData(params = {}, p = 1) {
    const {showLoading, showData} = this.props;
    showLoading();
    fetch(loadTempsUrl + '?p=' + p, showData, {
      data: params
    });
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
    const {source, loading, choose, tableState} = this.props.home;
    return (
      <div>
        <div className="mine-row">

          <Button type={'primary'}><Link to='/commodityManagement/add'>添加模板</Link></Button>
          <span className="ant-divider"/>
          <Button type={'primary'}><Link to='/commodityManagement'>商品管理</Link></Button>
        </div>
        <Tools keys={choose} callback={() => {
          if (tableState.page == null) {
            this.loadData();
          } else
            this.loadData(tableState, tableState.page.current);
        }}/>

        <Table columns={columns}
               dataSource={source.list}
               rowKey={'id'}
               pagination={source}
               rowSelection={this.selections()}
               loading={loading}
               bordered
               onChange={this.handleTableChange.bind(this)}
        />
      </div>
    )
  }
}
