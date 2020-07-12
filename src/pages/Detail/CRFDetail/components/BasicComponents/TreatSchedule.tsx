import React from 'react';
import EditableTable from '@/pages/BasicComponents/EditableTable';
import { Input, DatePicker } from 'antd';

class TreatSchedule extends React.Component {
  render() {
    return (
      <EditableTable
        dataColumns={[
          {
            title: '治疗名称',
            dataIndex: 'treatment_name',
            width: '10%',
            render: () => <Input />,
          },
          {
            title: '药物名称',
            key: 'medicine_name',
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
            key: 'end_time',
            width: '10%',
            render: () => <DatePicker />,
          },
        ]}
        operColumns={[]}
      />
    );
  }
}
export default () => <TreatSchedule />;
