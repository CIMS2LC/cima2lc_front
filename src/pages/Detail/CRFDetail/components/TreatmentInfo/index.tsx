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

import LaborInspect from '../BasicComponents/LaborInspect';
import Immunohistochemical from '../BasicComponents/Immunohistochemical';
import MolecularDetection from '../BasicComponents/MolecularDetection';
import SideReaction from './SideReaction';
import SystemSign from './SystemSign';
import TreatSchedule from '../BasicComponents/TreatSchedule';

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
  trement = [
    { label: '1线', value: 1 },
    { label: '2线', value: 2 },
    { label: '3线', value: 3 },
    { label: '4线', value: 4 },
    { label: '5线', value: 5 },
    { label: '手术', value: 6 },
    { label: '放疗', value: 7 },
    { label: '其他', value: 0 },
  ];

  best_effect_evalution = [
    { label: 'PD-进展', value: 1 },
    { label: 'SD-稳定', value: 2 },
    { label: 'PR-部分缓解', value: 3 },
    { label: 'CR-完全缓解', value: 4 },
    { label: '术后未发现新病灶', value: 5 },
  ];

  radiation_area = [
    '脑',
    '骨',
    '胸壁',
    '锁骨上',
    '胰腺',
    '肝脏',
    '腹膜后肿块',
    '肺',
    '胃周及区域转移淋巴',
    '皮肤',
    '膀胱',
    '胆囊',
    '结直肠',
    '乳腺',
    '淋巴结',
    '其他',
  ];
  render() {
    return (
      <div>
        <Tabs tabPosition="top">
          <TabPane tab="治疗记录" key="treatment_record">
            <Form name="treatment_record" {...layout}>
              <Form.Item label="几线治疗" name="trement">
                <Select
                  style={{ width: 120 }}
                  options={this.trement}
                  onChange={value => {
                    this.setState({ treatment: value });
                  }}
                />
              </Form.Item>
              {this.state.treatment < 6 && this.state.treatment >= 0 ? (
                <div>
                  <div>
                    <label>是否加入临床治疗</label>
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                      <Radio value={-1}>不详</Radio>
                    </Radio.Group>
                  </div>
                  <div>
                    <label>治疗方案</label>
                    <div>
                      <label>化疗</label>
                      <Switch
                        defaultChecked={false}
                        checkedChildren="有"
                        unCheckedChildren="无"
                        onChange={checked => {
                          this.setState({ chemotherapy: checked });
                        }}
                      />
                      {this.state.chemotherapy ? (
                        <TreatSchedule treat_schedule_name="chemotherapy" />
                      ) : null}
                    </div>
                    <div>
                      <label>靶向治疗</label>
                      <Switch
                        defaultChecked={false}
                        checkedChildren="有"
                        unCheckedChildren="无"
                        onChange={checked => {
                          this.setState({ targetedtherapy: checked });
                        }}
                      />
                      {this.state.targetedtherapy ? (
                        <TreatSchedule treat_schedule_name="targetedtherapy" />
                      ) : null}
                    </div>
                    <div>
                      <label>免疫治疗</label>
                      <Switch
                        defaultChecked={false}
                        checkedChildren="有"
                        unCheckedChildren="无"
                        onChange={checked => {
                          this.setState({ immunotherapy: checked });
                        }}
                      />
                      {this.state.immunotherapy ? (
                        <TreatSchedule treat_schedule_name="immunotherapy" />
                      ) : null}
                    </div>
                    <div>
                      <label>抗血管治疗</label>
                      <Switch
                        defaultChecked={false}
                        checkedChildren="有"
                        unCheckedChildren="无"
                        onChange={checked => {
                          this.setState({ antivasculartherapy: checked });
                        }}
                      />
                      {this.state.antivasculartherapy ? (
                        <TreatSchedule treat_schedule_name="antivasculartherapy" />
                      ) : null}
                    </div>
                    <div>
                      <label>其他</label>
                      <Switch
                        defaultChecked={false}
                        checkedChildren="有"
                        unCheckedChildren="无"
                        onChange={checked => {
                          this.setState({ othertherapy: checked });
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label>开始日期</label>
                    <DatePicker />
                  </div>
                  <div>
                    <label>结束日期</label>
                    <DatePicker />
                  </div>
                  <div>
                    <label>是否重复活检</label>
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </Radio.Group>
                  </div>
                  <div>
                    <label>活检方式</label>
                    <Input />
                  </div>
                  <div>
                    <label>取材部位</label>
                    <Input />
                  </div>
                  <div>
                    <label>标本库流水号</label>
                    <Input />
                  </div>
                  <div>
                    <label>病理诊断结果</label>
                    <Input />
                  </div>
                </div>
              ) : null}
              {this.state.treatment == 6 ? (
                <div>
                  <div>
                    <label>手术范围</label>
                    <Checkbox.Group>
                      <Checkbox value={1}>肺叶</Checkbox>
                      <Checkbox value={2}>肺段</Checkbox>
                      <Checkbox value={3}>楔形</Checkbox>
                      <Checkbox value={4}>双肺叶</Checkbox>
                      <Checkbox value={5}>全肺</Checkbox>
                      <Checkbox value={6}>其他</Checkbox>
                    </Checkbox.Group>
                  </div>
                  <div>
                    <label>淋巴清扫范围</label>
                    <Checkbox.Group>
                      <Checkbox value={1}>系统性清扫</Checkbox>
                      <Checkbox value={2}>取样</Checkbox>
                    </Checkbox.Group>
                    <InputNumber placeholder="清扫组数"></InputNumber>
                  </div>
                  <div>
                    <label>手术日期</label>
                    <DatePicker />
                  </div>
                  <div>
                    <label>术后辅助化疗</label>
                    <Switch
                      defaultChecked
                      checkedChildren="有"
                      unCheckedChildren="无"
                    />
                  </div>
                  <div>
                    <label>是否进展</label>
                    <Switch
                      defaultChecked
                      checkedChildren="有"
                      unCheckedChildren="无"
                    />
                  </div>
                </div>
              ) : null}
              {this.state.treatment == 7 ? (
                <div>
                  <div>
                    <label>开始日期</label>
                    <DatePicker />
                  </div>
                  <div>
                    <label>结束日期</label>
                    <DatePicker />
                  </div>
                  <div>
                    <label>放疗部位</label>
                    <Checkbox.Group options={this.radiation_area} />
                  </div>
                  <div>
                    <label>放疗剂量</label>
                    <InputNumber />
                    <Select
                      defaultValue="Gy"
                      style={{ width: 120 }}
                      onChange={e => {
                        console.log('');
                      }}
                    >
                      <Option value="Gy">Gy</Option>
                      <Option value="cGy">cGy</Option>
                    </Select>
                  </div>
                  <div>
                    <label>分割次数</label>
                    <InputNumber />
                  </div>
                </div>
              ) : null}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            </Form>
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
export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-edit-cell">
      <TreatmentInfo />
    </div>
  </div>
);
