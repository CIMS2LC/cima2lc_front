import React, { useState } from 'react';
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

const treat_schedule_medicine_options = {
  chemotherapy: {
    'EP方案（依托泊苷+奈达铂/顺铂/卡铂）': [{ value: '依托泊苷' }],
    'GP方案（吉西他滨+奈达铂/顺铂/卡铂）': [{ value: '吉西他滨' }],
    'DP方案（多西他赛+奈达铂/顺铂/卡铂）': [{ value: '多西他赛' }],
    'TP方案（紫杉醇+奈达铂/顺铂/卡铂）': [{ value: '紫杉醇' }],
    'NP方案（长春瑞滨+奈达铂/顺铂/卡铂）': [{ value: '长春瑞滨' }],
    'PP方案（培美曲塞+奈达铂/顺铂/卡铂）': [{ value: '培美曲塞' }],
    常用药物: [
      { value: '紫杉醇' },
      { value: '白蛋白紫杉醇' },
      { value: '伊立替康' },
      { value: '托泊替康' },
      { value: '铂类药物' },
      { value: '其他' },
    ],
  },
  targetedtherapy: {
    常用药物: [
      { value: '吉非替尼' },
      { value: '厄洛替尼' },
      { value: '埃克替尼' },
      { value: '阿法替尼' },
      { value: '克唑替尼' },
      { value: '奥希替尼' },
      { value: '曲妥珠单抗' },
      { value: '拉帕替尼' },
      { value: '贝伐单抗' },
      { value: '依维莫司' },
      { value: '尼妥珠单抗' },
      { value: '帕妥珠单抗' },
      { value: 'TDM1' },
      { value: '不详' },
      { value: '其他' },
    ],
  },
  immunotherapy: {},
  antivasculartherapy: {
    常用药物: [
      { value: '重组人血管内皮抑素' },
      { value: '贝伐珠单抗' },
      { value: '安罗替尼' },
      { value: '阿帕替尼' },
    ],
  },
};
function onChange(text, record, index) {
  record[index] = text;
}
interface TreatScheduleProps {
  treat_schedule_name: string;
}

class TreatSchedule extends React.Component {
  //const TreatSchedule: React.FC<TreatScheduleProps> = props => {
  passData = data => {
    this.props.passData(data);
  };
  //var [scheme, setScheme] = useState('常用药物');
  state = {
    scheme: '常用药物',
  };
  render() {
    return (
      <EditableTable
        dataColumns={[
          {
            title: '治疗名称',
            dataIndex: 'treatment_name',
            width: '10%',
            render: (text, record, index) => (
              <Input
                onChange={(e, eString) => {
                  console.log(record);
                  onChange(eString, record, 'date');
                }}
              />
            ),
          },
          {
            title: '治疗方案',
            dataIndex: 'treatment_name',
            width: '10%',
            render: (text, record, index) => {
              return (
                <Select
                  style={{ width: 120 }}
                  onChange={value => {
                    this.setState({ scheme: value });
                  }}
                  defaultValue="常用药物"
                  options={Object.keys(
                    treat_schedule_medicine_options[
                      this.props.treat_schedule_name
                    ],
                  ).map(item => ({ value: item }))}
                />
              );
            },
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
                  options={
                    treat_schedule_medicine_options[
                      this.props.treat_schedule_name
                    ][this.state.scheme]
                  }
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
                          <Tag>{props.value}</Tag>
                        </Popover>
                      </div>
                    );
                  }}
                ></Select>
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
        dataSource={this.props.dataSource}
        passData={this.props.passData}
        newData={{
          drugName: '药物',
          drugDose: '1g',
          duration: 0,
        }}
      />
    );
  }
}

export default TreatSchedule;
