import React from 'react';
import EditableTable from '@/pages/BasicComponents/EditableTable';
import { Input, DatePicker, Select } from 'antd';

//const treat_schedule_name = ['chemotherapy','targetedtherapy','immunotherapy','antivasculartherapy'];
const treat_schedule_medicine = {
  antivasculartherapy: [
    '重组人血管内皮抑素',
    '贝伐珠单抗',
    '安罗替尼',
    '阿帕替尼',
  ],
};

interface TreatScheduleProps {
  treat_schedule_name: string;
}
class TreatSchedule extends React.Component {
  constructor(props: TreatScheduleProps) {
    super(props);
    treat_schedule_medicine[props.treat_schedule_name].map((item: string) => {
      this.children_option.push(<Option key={item} />);
    });
    console.log(this.children_option);
    this.setState({
      children: this.children_option,
    });
    console.log(this.state.children);
  }
  state = {
    treat_schedule: '',
    children: [],
  };
  children_option = [];
  render() {
    return (
      <div>
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
              render: () => {
                return (
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Tags Mode"
                  >
                    {this.children_option}
                  </Select>
                );
              },
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
      </div>
    );
  }
}
export default TreatSchedule;
