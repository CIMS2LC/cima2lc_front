import React from 'react';
import EditableTable from '@/pages/BasicComponents/EditableTable';
import {
  Input,
  DatePicker,
  Select,
  Tag,
  Popover,
  InputNumber,
  Radio,
} from 'antd';
const { Option } = Select;

//const treat_schedule_name = ['chemotherapy','targetedtherapy','immunotherapy','antivasculartherapy'];
const treat_schedule_medicine = {
  chemotherapy: [],
  targetedtherapy: [
    '吉非替尼',
    '厄洛替尼',
    '埃克替尼',
    '阿法替尼',
    '克唑替尼',
    '奥希替尼',
    '曲妥珠单抗',
    '拉帕替尼',
    '贝伐单抗',
    '依维莫司',
    '尼妥珠单抗',
    '帕妥珠单抗',
    'TDM1',
    '不详',
    '其他',
  ],
  immunotherapy: [],
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
      this.children_option.push(<Option key={item}>{item}</Option>);
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
                    tagRender={props => {
                      return (
                        <div>
                          <Popover
                            content={
                              <div>
                                <label>剂量</label>
                                <InputNumber />
                                <label>单位</label>
                                <Radio.Group>
                                  <Radio value={1}>克</Radio>
                                  <Radio value={2}>毫克</Radio>
                                  <Radio value={3}>毫升</Radio>
                                </Radio.Group>
                              </div>
                            }
                          >
                            <Tag>{props.label}</Tag>
                          </Popover>
                        </div>
                      );
                    }}
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
