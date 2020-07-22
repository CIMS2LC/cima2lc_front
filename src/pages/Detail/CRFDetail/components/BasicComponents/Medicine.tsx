import React from 'react';
import EditableTable from '@/pages/BasicComponents/EditableTable';
import { Input, InputNumber } from 'antd';

const Medicine = props => {
  const passData = data => {
    props.passData(data);
  };
  return (
    <EditableTable
      dataColumns={[
        {
          title: '药物名称',
          dataIndex: 'drugName',
          width: '20%',
          editable: true,
        },
        {
          title: '日使用剂量',
          dataIndex: 'drugDose',
          width: '20%',
          editable: true,
        },
        {
          title: '累积使用时间（月）',
          dataIndex: 'duration',
          width: '20%',
          editable: true,
        },
      ]}
      operColumns={[]}
      passData={passData}
      newData={{
        drugName: '药物',
        drugDose: '1g',
        duration: 0,
      }}
    />
  );
};

export default Medicine;
