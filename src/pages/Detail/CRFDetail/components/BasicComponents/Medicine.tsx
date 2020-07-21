import React from 'react';
import EditableTable from '@/pages/BasicComponents/EditableTable';
import { Input, InputNumber } from 'antd';

class Medicine extends React.Component {
  constructor(props: any) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div>
        <EditableTable
          dataColumns={[
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
          ]}
          operColumns={[]}
        />
      </div>
    );
  }
}
export default Medicine;
