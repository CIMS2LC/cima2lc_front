import React from 'react';
import EditableTable from '@/pages/BasicComponents/EditableTable';
import { DatePicker, Select, Upload, Button } from 'antd';
import PicturesWall from './PicturesWall';
import { UploadOutlined } from '@ant-design/icons';

const fw_Options = [
  { label: '电话', value: 1 },
  { label: '门诊', value: 2 },
  { label: '住院', value: 3 },
];
const re_Options = [
  { label: 'PD-进展', value: 1 },
  { label: 'SD-稳定', value: 2 },
  { label: 'PR-部分缓解', value: 3 },
  { label: 'CR-完全缓解', value: 4 },
  { label: '术后未发现新病灶', value: 5 },
];
const ls_Options = [
  { label: '死亡', value: 1 },
  { label: '存活', value: 2 },
  { label: '失联', value: 3 },
];
const it_Options = [
  { label: 'X光', value: 1 },
  { label: '超声', value: 2 },
  { label: 'CT', value: 3 },
  { label: 'MRI', value: 4 },
  { label: 'PET/CT', value: 5 },
];

class FollowUpInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div>
        <EditableTable
          dataColumns={[
            {
              title: '序号',
              dataIndex: 'order',
              width: '5%',
            },
            {
              title: '随访日期',
              key: 'followup_time',
              width: '10%',
              render: () => <DatePicker />,
            },
            {
              title: '随访方式',
              key: 'followup_way',
              width: '10%',
              render: () => (
                <Select style={{ width: 120 }} options={fw_Options} />
              ),
            },
            {
              title: '疗效评估',
              dataIndex: 'response_evaluation',
              width: '10%',
              render: () => (
                <Select style={{ width: 120 }} options={re_Options} />
              ),
            },
            {
              title: '生存状态',
              dataIndex: 'live_state',
              width: '10%',
              render: () => (
                <Select style={{ width: 120 }} options={ls_Options} />
              ),
            },
            {
              title: '影像类型',
              dataIndex: 'image_type',
              width: '10%',
              render: () => (
                <Select style={{ width: 120 }} options={it_Options} />
              ),
            },
            {
              title: '影像',
              dataIndex: 'image',
              width: '20%',
              render: () => <PicturesWall />,
            },
          ]}
          operColumns={[]}
        />
      </div>
    );
  }
}
export default FollowUpInfo;
