import { InputNumber, Input } from 'antd';
import React from 'react';

var columns = [
  {
    title: '药物名称',
    dataIndex: 'medicine_name',
    width: '20%',
    render: () => <Input />,
  },
  {
    title: '日使用剂量',
    key: 'medicine_count',
    width: '20%',
    render: () => <InputNumber />,
  },
  {
    title: '累积使用时间（月）',
    key: 'exist',
    width: '20%',
    render: () => <InputNumber />,
  },
];

export { columns };
