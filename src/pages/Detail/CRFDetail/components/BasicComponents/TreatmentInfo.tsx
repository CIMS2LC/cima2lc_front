import React from 'react';
import {
  Tabs,
  Form,
  Divider,
  Radio,
  Rate,
  Input,
  Button,
  Select,
  TimePicker,
  DatePicker,
  Checkbox,
  InputNumber,
  Switch,
  Popconfirm,
} from 'antd';
import styles from './index.less';

import LaborInspect from './LaborInspect';
import Immunohistochemical from './Immunohistochemical';
import MolecularDetection from './MolecularDetection';
import SideReaction from './SideReaction';
import SystemSign from './SystemSign';
import TreatSchedule from './TreatSchedule';
import TreatmentRecord from './TreatmentRecord';
const { TabPane } = Tabs;
const { Option } = Select;

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 8,
  },
};

class TreatmentInfo extends React.Component {
  state = {
    treatment: -1,
    chemotherapy: false,
    targetedtherapy: false,
    immunotherapy: false,
    othertherapy: false,
    antivasculartherapy: false,
  };

  best_effect_evalution = [
    { label: 'PD-进展', value: 1 },
    { label: 'SD-稳定', value: 2 },
    { label: 'PR-部分缓解', value: 3 },
    { label: 'CR-完全缓解', value: 4 },
    { label: '术后未发现新病灶', value: 5 },
  ];

  render() {
    return (
      <div>
        <Tabs tabPosition="top">
          <TabPane tab="治疗记录" key="treatment_record">
            <TreatmentRecord />
          </TabPane>

          <TabPane tab="实验室检查" key="labor_inspect">
            <LaborInspect />
          </TabPane>
          <TabPane tab="免疫组化" key="immunohistochemical">
            <Immunohistochemical />
          </TabPane>
          <TabPane tab="分子检测" key="molecular_detection">
            <MolecularDetection />
          </TabPane>
          <TabPane tab="疗效评估" key="effect_evalution">
            <Form name="effect_evalution" {...layout}>
              <Form.Item
                label="最佳疗效评估日期"
                name="best_effect_evalution_date"
              >
                <DatePicker />
              </Form.Item>
              <Form.Item label="最佳疗效评估" name="best_effect_evalution">
                <Select
                  style={{ width: 120 }}
                  options={this.best_effect_evalution}
                />
              </Form.Item>
              <Form.Item label="进展日期" name="progress_date">
                <DatePicker />
              </Form.Item>
              <Form.Item label="进展描述" name="progress_description">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="症状体征" key="system_sign">
            <SystemSign />
          </TabPane>
          <TabPane tab="副反应" key="side_reaction">
            <SideReaction />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default TreatmentInfo;
