import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Space, Input, Popconfirm, Select } from 'antd';
import { Link } from 'umi';
import styles from './table.less';

const { Search } = Input;
const { Option } = Select;
const state = {
  select: 'all',
};
const columns = [
  {
    title: 'ID', //列名
    dataIndex: 'id',
    width: 100, //列宽
  },
  {
    title: '住院号',
    dataIndex: 'hospitalID',
    width: 150,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 100,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 100,
  },
  {
    title: '填表日期',
    dataIndex: 'recore_time',
    width: 200,
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    render: (text, record) => (
      <Space size="middle">
        <a>
          {' '}
          <Link to="Questionnaire">查看详情</Link>
        </a>
        <Popconfirm
          title="确定删除?"
          onConfirm={() => handleDelete(record.key)}
        >
          <a>删除</a>
        </Popconfirm>
      </Space>
    ),
  },
];
const handleDelete = (key: any) => {
  //确认删除直接获取key，并传入后端
  //删除函数
  console.log(key);
  console.log('删除成功');
};

const data = [
  //设置key等于id
  {
    key: '147',
    id: '1',
    name: 'John Brown',
    age: 32,
  },
  {
    key: '29807',
    id: '2',
    name: 'Jim Green',
    age: 42,
  },
  {
    key: '36789',
    name: 'Joe Black',
    age: 32,
  },
];

export default () => {
  return (
    <div className={styles.mainlayout}>
      <div>
        <br />
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={value => {
            state.select = value;
          }}
        >
          <Option value="all">全部</Option>
          <Option value="name">姓名</Option>
          <Option value="id">身份证号</Option>
          <Option value="ad">住院号</Option>
        </Select>
        <Search
          //  placeholder="input search text"
          style={{ width: 250 }}
          enterButton="查找"
          onSearch={value => console.log(value)}
        />

        <Button style={{ left: 380 }} type="primary">
          <Link to="Questionnaire">肺康复患者调查表</Link>
        </Button>
        <Button style={{ left: 430 }} type="primary">
          <Link to="list/fuv_list">返回主页面</Link>
        </Button>
      </div>
      <br />
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 15 }} //每页显示15条
        ></Table>
      </div>
    </div>
  );
};
