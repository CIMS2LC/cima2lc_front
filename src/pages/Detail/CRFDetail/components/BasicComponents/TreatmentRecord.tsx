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
import TreatSchedule from './TreatSchedule';
import { treRecsave, treRecupdate } from '../../service';
const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 8,
  },
};

const { Option } = Select;
class TreatmentRecord extends React.Component {
  constructor(props: any) {
    super(props);
  }
  state = {
    treatment: -1,
    chemotherapy: false,
    targetedtherapy: false,
    immunotherapy: false,
    othertherapy: false,
    antivasculartherapy: false,
    Chemotherapy: undefined,
    TargetedTherapy: undefined,
    ImmunityTherapy: undefined,
    AntivascularTherapy: undefined,
    Other: undefined,
    trement_name: '',
  };
  trement = [
    { label: '1线', value: 1 },
    { label: '2线', value: 2 },
    { label: '3线', value: 3 },
    { label: '4线', value: 4 },
    { label: '5线', value: 5 },
    { label: '手术', value: 6 },
    { label: '放疗', value: 7 },
    { label: '其他', value: 8 },
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
  best_effect_evalution = [
    { label: 'PD-进展', value: 1 },
    { label: 'SD-稳定', value: 2 },
    { label: 'PR-部分缓解', value: 3 },
    { label: 'CR-完全缓解', value: 4 },
    { label: '术后未发现新病灶', value: 5 },
  ];
  treatment_name = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'surgery',
    'radiotherapy',
    'other',
  ];
  onfinish = async (values: any) => {
    values['Chemotherapy'] = this.state.Chemotherapy;
    values['TargetedTherapy'] = this.state.TargetedTherapy;
    values['ImmunityTherapy'] = this.state.ImmunityTherapy;
    values['AntivascularTherapy'] = this.state.AntivascularTherapy;
    values['Other'] = this.state.Other;
    if (values.proDate) values.proDate = values.proDate.format('YYYY-MM-DD');
    if (values.beEffEvaDate)
      values.beEffEvaDate = values.beEffEvaDate.format('YYYY-MM-DD');
    if (values.begDate)
      values.beEffEvaDate = values.begDate.format('YYYY-MM-DD');
    if (values.endDate)
      values.beEffEvaDate = values.endDate.format('YYYY-MM-DD');

    if (this.id != -1) {
      const res = await treRecupdate({
        pid: this.props.pid,
        treNum: this.props.treNum,
        trement: this.state.trement_name,
        ...values,
      });
      if (res && res.code == 200) {
        console.log('更新成功');
      } else {
        console.log('更新失败');
      }
    } else {
      const res = await treRecsave({
        pid: this.props.pid,
        treNum: this.props.treNum,
        data: { treNum: this.props.treNum, ...values },
      });
      if (res && res.code == 200) {
        this.id = res.id;
        console.log('提交成功');
      } else {
        console.log('提交失败');
      }
    }
    console.log(values);
  };
  render() {
    return (
      <Form name="treatment_record" {...layout} onFinish={this.onfinish}>
        <Form.Item label="几线治疗" name="trement">
          <Select
            style={{ width: 120 }}
            options={this.trement}
            onChange={(value: number) => {
              this.setState({ trement_name: this.treatment_name[value - 1] });
              this.setState({ treatment: value });
            }}
          />
        </Form.Item>
        {this.state.treatment < 6 && this.state.treatment >= 0 ? (
          <Form.Item name={this.state.trement_name}>
            <Form.Item
              label="是否加入临床治疗"
              name={[this.state.trement_name, 'isTre']}
            >
              <Radio.Group>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
                <Radio value={-1}>不详</Radio>
              </Radio.Group>
            </Form.Item>

            <label>治疗方案:</label>
            <Form.Item label="化疗">
              <Switch
                defaultChecked={false}
                checkedChildren="有"
                unCheckedChildren="无"
                onChange={checked => {
                  this.setState({ chemotherapy: checked });
                }}
              />
            </Form.Item>
            {this.state.chemotherapy ? (
              <TreatSchedule
                treat_schedule_name="chemotherapy"
                passData={data => {
                  this.setState({ Chemotherapy: data });
                }}
              />
            ) : null}

            <Form.Item label="靶向治疗">
              <Switch
                defaultChecked={false}
                checkedChildren="有"
                unCheckedChildren="无"
                onChange={checked => {
                  this.setState({ targetedtherapy: checked });
                }}
              />
            </Form.Item>
            {this.state.targetedtherapy ? (
              <TreatSchedule
                treat_schedule_name="targetedtherapy"
                passData={data => {
                  this.setState({ TargetedTherapy: data });
                }}
              />
            ) : null}

            <Form.Item label="免疫治疗">
              <Switch
                defaultChecked={false}
                checkedChildren="有"
                unCheckedChildren="无"
                onChange={checked => {
                  this.setState({ immunotherapy: checked });
                }}
              />
            </Form.Item>
            {this.state.immunotherapy ? (
              <TreatSchedule
                treat_schedule_name="immunotherapy"
                passData={data => {
                  this.setState({ ImmunityTherapy: data });
                }}
              />
            ) : null}

            <Form.Item label="抗血管治疗">
              <Switch
                defaultChecked={false}
                checkedChildren="有"
                unCheckedChildren="无"
                onChange={checked => {
                  this.setState({ antivasculartherapy: checked });
                }}
              />
            </Form.Item>
            {this.state.antivasculartherapy ? (
              <TreatSchedule
                treat_schedule_name="antivasculartherapy"
                passData={data => {
                  this.setState({ AntivascularTherapy: data });
                }}
              />
            ) : null}

            <Form.Item label="其他">
              <Switch
                defaultChecked={false}
                checkedChildren="有"
                unCheckedChildren="无"
                onChange={checked => {
                  this.setState({ othertherapy: checked });
                }}
              />
            </Form.Item>

            <Form.Item
              label="开始日期"
              name={[this.state.trement_name, 'begDate']}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="结束日期"
              name={[this.state.trement_name, 'endDate']}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="是否重复活检"
              name={[this.state.trement_name, 'isRepBio']}
            >
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="活检方式"
              name={[this.state.trement_name, 'bioMet']}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="取材部位"
              name={[this.state.trement_name, 'matPart']}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="标本库流水号"
              name={[this.state.trement_name, 'specNum']}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="病理诊断结果"
              name={[this.state.trement_name, 'patDiaRes']}
            >
              <Input />
            </Form.Item>
          </Form.Item>
        ) : null}
        {this.state.treatment == 6 ? (
          <Form.Item name={this.state.trement_name}>
            <Form.Item
              label="手术范围"
              name={[this.state.trement_name, 'surSco']}
            >
              <Checkbox.Group>
                <Checkbox value={1}>肺叶</Checkbox>
                <Checkbox value={2}>肺段</Checkbox>
                <Checkbox value={3}>楔形</Checkbox>
                <Checkbox value={4}>双肺叶</Checkbox>
                <Checkbox value={5}>全肺</Checkbox>
                <Checkbox value={6}>其他</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label="淋巴清扫范围"
              name={[this.state.trement_name, 'lymDis']}
            >
              <Checkbox.Group>
                <Checkbox value={1}>系统性清扫</Checkbox>
                <Checkbox value={2}>取样</Checkbox>
              </Checkbox.Group>
              <InputNumber placeholder="清扫组数"></InputNumber>
            </Form.Item>
            <Form.Item
              label="手术日期"
              name={[this.state.trement_name, 'surDate']}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="术后辅助化疗"
              name={[this.state.trement_name, 'posAdjChem']}
            >
              <Switch
                defaultChecked
                checkedChildren="有"
                unCheckedChildren="无"
              />
            </Form.Item>
            <Form.Item
              label="是否进展"
              name={[this.state.trement_name, 'isPro']}
            >
              <Switch
                defaultChecked
                checkedChildren="有"
                unCheckedChildren="无"
              />
            </Form.Item>
          </Form.Item>
        ) : null}
        {this.state.treatment == 7 ? (
          <Form.Item name={this.state.trement_name}>
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
          </Form.Item>
        ) : null}

        <Form.Item label="最佳疗效评估日期" name="beEffEvaDate">
          <DatePicker />
        </Form.Item>
        <Form.Item label="最佳疗效评估" name="beEffEva">
          <Select style={{ width: 120 }} options={this.best_effect_evalution} />
        </Form.Item>
        <Form.Item label="进展日期" name="proDate">
          <DatePicker />
        </Form.Item>
        <Form.Item label="进展描述" name="proDes">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default TreatmentRecord;
