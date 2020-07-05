import { DatePicker, Select, Popconfirm, Radio } from 'antd';
import React from 'react';

var columns = [
  {
    title: '症状名称',
    dataIndex: 'order',
    width: '5%',
  },
  {
    title: '开始日期',
    key: 'begin_time',
    width: '10%',
    render: () => <DatePicker />,
  },
  {
    title: '目前是否存在',
    key: 'exist',
    width: '10%',
    render: () => (
      <Radio.Group>
        <Radio value={0}>否</Radio>
        <Radio value={1}>是</Radio>
      </Radio.Group>
    ),
  },
  {
    title: '结束日期',
    dataIndex: 'end_time',
    width: '10%',
    render: () => <DatePicker />,
  },
];

export { columns };
