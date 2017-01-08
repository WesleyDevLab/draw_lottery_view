/**
 * 表格
 * draw_lottery CommodityTable.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-08 23:38:38
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */
import React, { Component } from 'react';
const columns = [{
  title: '商品编号',
  dataIndex: 'id',
  sorter: true,
}, {
  title: '商品期数',
  dataIndex: 'round_time',
},{
  title:'商品名称',
  dataIndex:'name'
},{
  title:'商品属性',
  dataIndex:'genre'
},{
  title:'商品分类',
  dataIndex:'typeName'
},{
  title:'商品状态',
  dataIndex:'stateName',
},{
  title:'上架时间',
  dataIndex:'groundTime'
},{
  title:'下架时间',
  dataIndex:'undercarriageDate'
},{
  title:'商品点击量',
  dataIndex:'viewNum'
},{
  title:'总需',
  dataIndex:'buyTotalNumber'
},{
  title:'已售',
  dataIndex:'buyCurrentNumber'
},{
  title:'剩余',
  dataIndex:'buyNowNumber'
}];
class CommodityTable extends Component {
  render() {
    const {data,loading,handleChange} = this.props;
    return <Table columns={columns}
          dataSource={data.list},
          pagination={data},
          loading={loading},
          onChange={handleChange}
    />
  }
}

CommodityTable.propTypes={
  data:React.PropTypes.object.isRequired,
  loading:React.PropTypes.boolean.isRequired,
  handleChange:React.PropTypes.func,
}

export default CommodityTable;
