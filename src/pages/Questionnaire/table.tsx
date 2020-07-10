import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Space, Input, Popconfirm } from 'antd';
import { Link } from 'umi';
import styles from './table.less';

const { Search } = Input;

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
        <a>查看详情</a>
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
const handleDelete = key => {
  //删除函数
  console.log(key);
  console.log('删除成功');
};

const data = [
  {
    key: '1',
    id: '1',
    name: 'John Brown',
    age: 32,
  },
  {
    key: '2',
    id: '2',
    name: 'Jim Green',
    age: 42,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
  },
];

export default () => {
  return (
    <div className={styles.mainlayout}>
      <div>
        <br />
        <Search
          //  placeholder="input search text"
          style={{ width: 250 }}
          enterButton="查找"
          onSearch={value => console.log(value)}
        />
        <Button style={{ left: 450 }} type="primary">
          <Link to="Questionnaire">肺康复患者调查表</Link>
        </Button>
        <Button style={{ left: 500 }} type="primary">
          <Link to="detail/crf_detail">返回主页面</Link>
        </Button>
      </div>
      <br />
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
        >
          {' '}
        </Table>
      </div>
    </div>
  );
};
