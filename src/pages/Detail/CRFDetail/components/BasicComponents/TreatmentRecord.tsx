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
  Row,
  Col,
} from 'antd';
import TreatSchedule from './TreatSchedule';
import { treRecsave, treRecupdate } from '../../service';
import moment from 'moment';
const layout = {
  labelAlign: 'left',
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 24,
  },
};
const layout1 = {
  labelAlign: 'left',
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 4,
  },
};
const { Option } = Select;

const treatment_map = {
  one: 'One',
  two: 'Two',
  three: 'Three',
  four: 'Four',
  five: 'Five',
  surgery: 'Surgery',
  radiotherapy: 'Radiotherapy',
  other: 'Other',
};

class TreatmentRecord extends React.Component {
  constructor(props: any) {
    super(props);
    if (this.props.initialValues) {
      this.TreRec = this.props.initialValues.TreRec[this.props.treNum - 1];
      if (this.TreRec) {
        if (this.TreRec.beEffEvaDate)
          this.TreRec['beEffEvaDate'] = moment(this.TreRec.beEffEvaDate);
        if (this.TreRec.proDate)
          this.TreRec['proDate'] = moment(this.TreRec.proDate);
        if (this.TreRec.trement) {
          this.state.trement_name = this.TreRec.trement;
          var treVal =
            ['surgery', 'radiotherapy'].indexOf(this.state.trement_name) != -1
              ? this.props.initialValues[treatment_map[this.TreRec.trement]][
                  this.props.treNum - 1
                ]
              : this.props.initialValues['OneToFive'][this.props.treNum - 1];
          if (
            ['one', 'two', 'three', 'four', 'five', 'other'].indexOf(
              this.state.trement_name,
            ) != -1
          ) {
            if (treVal.begDate) treVal.begDate = moment(treVal.begDate);
            if (treVal.endDate) treVal.endDate = moment(treVal.endDate);
            if (treVal.treSolu) {
              if (treVal.treSolu.indexOf('Chemotherapy') != -1)
                this.state.chemotherapy = true;
              if (treVal.treSolu.indexOf('TargetedTherapy') != -1)
                this.state.targetedtherapy = true;
              if (treVal.treSolu.indexOf('ImmunityTherapy') != -1)
                this.state.immunotherapy = true;
              if (treVal.treSolu.indexOf('AntivascularTherapy') != -1)
                this.state.antivasculartherapy = true;
              if (treVal.treSolu.indexOf('Other') != -1)
                this.state.othertherapy = true;
            }
            if (this.props.initialValues.DetailTrePlan) {
              this.props.initialValues.DetailTrePlan.map(item => {
                if (item.treNum == this.props.treNum) {
                  if (treVal[item.treSolu]) {
                    treVal[item.treSolu].push(item);
                  } else {
                    treVal[item.treSolu] = [];
                    treVal[item.treSolu].push(item);
                  }
                }
              });
            }
          }
          if (['surgery'].indexOf(this.state.trement_name) != -1) {
            if (treVal.surDate) treVal.surDate = moment(treVal.surDate);
            if (treVal.proDate) treVal.proDate = moment(treVal.proDate);
          }
          if (['radiotherapy'].indexOf(this.state.trement_name) != -1) {
            if (treVal.begDate) treVal.begDate = moment(treVal.begDate);
            if (treVal.endDate) treVal.endDate = moment(treVal.endDate);
          }
          console.log(treVal);
          this.TreRec[this.TreRec.trement] = treVal;
        }
      }
    }
    console.log(this.TreRec);
  }
  TreRec = undefined;
  state = {
    treatment: '',
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
    posAdjChem: false,
    isPro: false,
    clinTri: false, //临床实验名称
  };
  trement = [
    { label: '1线', value: 'one' },
    { label: '2线', value: 'two' },
    { label: '3线', value: 'three' },
    { label: '4线', value: 'four' },
    { label: '5线', value: 'five' },
    { label: '手术', value: 'surgery' },
    { label: '放疗', value: 'radiotherapy' },
    { label: '其他', value: 'other' },
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
  onfinish = async (values: any) => {
    console.log(values);
    if (values.proDate) values.proDate = values.proDate.format('YYYY-MM-DD');
    if (values.beEffEvaDate)
      values.beEffEvaDate = values.beEffEvaDate.format('YYYY-MM-DD');
    if (values.begDate) values.begDate = values.begDate.format('YYYY-MM-DD');
    if (values.endDate) values.endDate = values.endDate.format('YYYY-MM-DD');

    //处理treSolu,1-5线处理
    if (
      ['one', 'two', 'three', 'four', 'five', 'other'].indexOf(
        this.state.trement_name,
      ) != -1
    ) {
      var treSolu = [];
      if (this.state.chemotherapy) treSolu.push('Chemotherapy');
      if (this.state.targetedtherapy) treSolu.push('TargetedTherapy');
      if (this.state.immunotherapy) treSolu.push('ImmunityTherapy');
      if (this.state.antivasculartherapy) treSolu.push('AntivascularTherapy');
      if (this.state.othertherapy) treSolu.push('Other');
      values[this.state.trement_name]['treSolu'] = treSolu.toString();
      if (values[this.state.trement_name]['begDate'])
        values[this.state.trement_name]['begDate'] = values[
          this.state.trement_name
        ]['begDate'].format('YYYY-MM-DD');
      if (values[this.state.trement_name]['endDate'])
        values[this.state.trement_name]['endDate'] = values[
          this.state.trement_name
        ]['endDate'].format('YYYY-MM-DD');
      values['Chemotherapy'] = this.state.Chemotherapy;
      values['TargetedTherapy'] = this.state.TargetedTherapy;
      values['ImmunityTherapy'] = this.state.ImmunityTherapy;
      values['AntivascularTherapy'] = this.state.AntivascularTherapy;
      values['Other'] = this.state.Other;
    }
    if (['surgery'].indexOf(this.state.trement_name) != -1) {
      values['Chemotherapy'] = this.state.Chemotherapy;
      if (values[this.state.trement_name]['surDate'])
        values[this.state.trement_name]['surDate'] = values[
          this.state.trement_name
        ]['surDate'].format('YYYY-MM-DD');
    }
    if (['radiotherapy'].indexOf(this.state.trement_name) != -1) {
      if (values[this.state.trement_name]['begDate'])
        values[this.state.trement_name]['begDate'] = values[
          this.state.trement_name
        ]['begDate'].format('YYYY-MM-DD');
      if (values[this.state.trement_name]['endDate'])
        values[this.state.trement_name]['endDate'] = values[
          this.state.trement_name
        ]['endDate'].format('YYYY-MM-DD');
    }
    //if (this.id != -1) {
    const res = await treRecupdate({
      pid: this.props.pid,
      treNum: this.props.treNum,
      data: { id: this.id, treNum: this.props.treNum, ...values },
    });
    if (res && res.code == 200) {
      console.log('更新成功');
    } else {
      console.log('更新失败');
    }
  };
  render() {
    return (
      <Form
        name="treatment_record"
        {...layout}
        onFinish={this.onfinish}
        initialValues={this.TreRec}
      >
        <Form.Item
          label="几线治疗"
          name="trement"
          //initialValue={this.props.initialValues.TreRec[this.props.treNum]}
        >
          <Select
            style={{ width: 120 }}
            options={this.trement}
            onChange={(value: string) => {
              this.setState({ trement_name: value });
            }}
          />
        </Form.Item>
        {['one', 'two', 'three', 'four', 'five', 'other'].indexOf(
          this.state.trement_name,
        ) != -1 ? (
          <Form.Item name={this.state.trement_name}>
            <Form.Item
              label="是否加入临床治疗"
              name={[this.state.trement_name, 'isTre']}
            >
              <Radio.Group
                onChange={v => {
                  if (v.target.value == 1) this.setState({ clinTri: true });
                  else this.setState({ clinTri: false });
                }}
              >
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
                <Radio value={-1}>不详</Radio>
              </Radio.Group>
            </Form.Item>

            {this.state.clinTri ? (
              <Form.Item label="临床实验名称" name="clinTri">
                <Input />
              </Form.Item>
            ) : null}

            <label>治疗方案:</label>
            <Form.Item label="化疗">
              <Switch
                defaultChecked={this.state.chemotherapy || false}
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
                dataSource={
                  this.TreRec
                    ? this.TreRec[this.TreRec.trement]['Chemotherapy']
                    : null
                }
              />
            ) : null}

            <Form.Item label="靶向治疗">
              <Switch
                defaultChecked={this.state.targetedtherapy || false}
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
                dataSource={
                  this.TreRec
                    ? this.TreRec[this.TreRec.trement]['TargetedTherapy']
                    : null
                }
              />
            ) : null}

            <Form.Item label="免疫治疗">
              <Switch
                defaultChecked={this.state.immunotherapy || false}
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
                dataSource={
                  this.TreRec
                    ? this.TreRec[this.TreRec.trement]['ImmunityTherapy']
                    : null
                }
              />
            ) : null}

            <Form.Item label="抗血管治疗">
              <Switch
                defaultChecked={this.state.antivasculartherapy || false}
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
                dataSource={
                  this.TreRec
                    ? this.TreRec[this.TreRec.trement]['AntivascularTherapy']
                    : null
                }
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
            <Form.Item label="备注" name={[this.state.trement_name, 'note']}>
                              
              <Input.TextArea rows={4} />
                            
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

        {['surgery'].indexOf(this.state.trement_name) != -1 ? (
          <Form.Item name={this.state.trement_name}>
            <Form.Item
              label="手术范围"
              name={[this.state.trement_name, 'surSco']}
            >
              <Checkbox.Group>
                <Checkbox value="肺叶">肺叶</Checkbox>
                <Checkbox value="肺段">肺段</Checkbox>
                <Checkbox value="楔形">楔形</Checkbox>
                <Checkbox value="双肺叶">双肺叶</Checkbox>
                <Checkbox value="全肺">全肺</Checkbox>
                <Checkbox value="其他">其他</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label="淋巴清扫范围"
              name={[this.state.trement_name, 'lymDis']}
            >
              <Checkbox.Group>
                <Checkbox value="系统性清扫">系统性清扫</Checkbox>
                <Checkbox value="取样">取样</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label="清扫组数"
              name={[this.state.trement_name, 'cleGro']}
            >
                            
              <Input />
                          
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
                defaultChecked={this.state.posAdjChem}
                checkedChildren="有"
                unCheckedChildren="无"
                onChange={checked => {
                  this.setState({ posAdjChem: checked });
                }}
              />
            </Form.Item>
            {this.state.posAdjChem ? (
              <TreatSchedule
                treat_schedule_name="chemotherapy"
                passData={data => {
                  this.setState({ Chemotherapy: data });
                }}
              /> //辅助化疗的表格(名字需要改)
            ) : null}

            <Form.Item label="是否进展" name="isPro">
              <Switch
                defaultChecked={this.state.isPro}
                checkedChildren="有"
                unCheckedChildren="无"
                onChange={checked => {
                  this.setState({ isPro: checked });
                }}
              />
            </Form.Item>
            {this.state.isPro ? (
              <div>
                <Form.Item label="进展日期" name="proDate">
                  <DatePicker />
                </Form.Item>
                <Form.Item label="进展描述" name="proDes">
                  <Input />
                </Form.Item>
              </div>
            ) : null}
          </Form.Item>
        ) : null}

        {['radiotherapy'].indexOf(this.state.trement_name) != -1 ? (
          <div>
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
              label="放疗部位"
              name={[this.state.trement_name, 'radSite']}
            >
              <Checkbox.Group options={this.radiation_area} />
            </Form.Item>
            <Form.Item
              label="放疗剂量"
              name={[this.state.trement_name, 'radDose']}
              {...layout1}
            >
              <Row>
                <Col span={12}>
                  <InputNumber />
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={[this.state.trement_name, 'dosUnit']}
                    initialValue={0}
                  >
                    <Select>
                      <Option value={0}>Gy</Option>
                      <Option value={1}>cGy</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              label="分割次数"
              name={[this.state.trement_name, 'splTim']}
              {...layout1}
            >
              <Row>
                <Col span={12}>
                  <InputNumber />
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={[this.state.trement_name, 'method']}
                    initialValue={'qd'}
                  >
                    <Select>
                      <Option value={'qd'}>qd</Option>
                                            <Option value={'bid'}>bid</Option>
                                            <Option value={'tid'}>tid</Option>
                                            <Option value={'qid'}>qid</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </div>
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
