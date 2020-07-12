import { DatePicker, Input } from 'antd';
import React from 'react';

// Just show the latest item.
var columns = [
  {
    title: '治疗名称',
    dataIndex: 'description',
    width: '10%',
    render: () => <Input />,
  },
  {
    title: '药物名称',
    key: 'grade',
    width: '10%',
    render: () => <Input />,
  },
  {
    title: '给药/治疗开始日期',
    key: 'begin_time',
    width: '10%',
    render: () => <DatePicker />,
  },
  {
    title: '给药/治疗结束日期',
    key: 'begin_time',
    width: '10%',
    render: () => <DatePicker />,
  },
];

export { columns };
