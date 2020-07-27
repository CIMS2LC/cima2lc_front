import React from 'react';
import EditableTable from '@/pages/BasicComponents/EditableTable';
import { Radio, DatePicker, Cascader, Rate, Input } from 'antd';
import { sideEffectsave, signssave, signsupdate } from '../../service';
import moment from 'moment';

const SystemSign = props => {
  const passData = data => {
    props.passData(data);
  };
  const onChange = (text, record, index) => {
    record[index] = text;
  };
  return (
    <EditableTable
      dataColumns={[
        {
          title: '序号',
          dataIndex: 'key',
          key: 'key',
          width: '5%',
          render: (text, record, index) => {
            return <span>{index + 1}</span>;
          },
        },
        {
          title: '症状名称',
          dataIndex: 'symName',
          key: 'symName',
          width: '10%',
          render: (text, record, index) => (
            <Input
              defaultValue={record['symName']}
              onChange={e => {
                onChange(e.target.value, record, 'symName');
              }}
            />
          ),
        },
        {
          title: '开始日期',
          dataIndex: 'begDate',
          key: 'begDate',
          width: '10%',
          render: (text, record, index) => (
            <DatePicker
              defaultValue={moment(record['begDate'])}
              onChange={(e, eString) => {
                onChange(eString, record, 'begDate');
              }}
            />
          ),
        },
        {
          title: '目前是否存在',
          dataIndex: 'isExe',
          key: 'isExe',
          width: '10%',
          render: (text, record, index) => (
            <Radio.Group
              defaultValue={record['isExe']}
              onChange={e => {
                onChange(e.target.value, record, 'isExe');
              }}
            >
              <Radio value={false}>否</Radio>
              <Radio value={true}>是</Radio>
            </Radio.Group>
          ),
        },
        {
          title: '结束日期',
          dataIndex: 'endDate',
          key: 'endDate',
          width: '10%',
          render: (text, record, index) => (
            <DatePicker
              defaultValue={moment(record['begDate'])}
              onChange={(e, eString) => {
                onChange(eString, record, 'endDate');
              }}
            />
          ),
        },
      ]}
      hassave={true}
      save={signsupdate}
      dataSource={props.initialValues}
      operColumns={[]}
      passData={passData}
      pid={props.pid}
      treNum={props.treNum}
    />
  );
};

export default SystemSign;
