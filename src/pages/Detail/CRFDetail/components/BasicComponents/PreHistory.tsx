import React from 'react';
import {
  Form,
  Radio,
  Input,
  Switch,
  Button,
  Checkbox,
  InputNumber,
} from 'antd';
import Hormone from './Hormone';
import Medicine from './Medicine';
import { PastHissave } from '../../service';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};

class PreHistory extends React.Component {
  state = {
    id: this.props.id,
    is_smoke: 0,
    stop_smoke: 0,
    is_drink: 0,
    stop_drink: 0,
    is_hormone: 0,
    is_medicine: 0,
    is_tumHis: 0,
    is_tumFamHis: 0,
  };

  onChange_smoke = (e: any) => {
    console.log('is_smoke', e.target.value);
    this.setState({
      is_smoke: e.target.value,
    });
  };

  onChange_stopsmoke = (e: any) => {
    console.log('stop_smoke', e.target.value);
    this.setState({
      stop_smoke: e.target.value,
    });
  };
  onChange_drink = (e: any) => {
    console.log('is_drink', e.target.value);
    this.setState({
      is_drink: e.target.value,
    });
  };

  onChange_stopdrink = (e: any) => {
    console.log('stop_drink', e.target.value);
    this.setState({
      stop_drink: e.target.value,
    });
  };
  onChange_hormone = (e: any) => {
    console.log('is_hormone', e.target.value);
    this.setState({
      is_hormone: e.target.value,
    });
  };
  onChange_medicine = (e: any) => {
    console.log('is_medicine', e.target.value);
    this.setState({
      is_medicine: e.target.value,
    });
  };
  onChange_state_value = (key: string, value: string) => {
    this.setState({
      [key]: value,
    });
  };
  clinical_manifestation_Options = [
    '无',
    '体检',
    '咳嗽',
    '咳痰',
    '痰中带血',
    '咳血',
    '胸闷',
    '胸痛',
    '气促',
    '发热',
    '食欲不佳',
    '体重减轻',
    '其他',
    '不详',
  ];
  underlying_disease_history_Options = [
    '无',
    '高血压',
    '冠心病',
    '糖尿病',
    '慢性阻塞性肺病',
    '支气管哮喘',
    '肺结核',
    '间质性肺病',
    '高血脂',
    '肝炎',
    '风湿性免疫性疾病',
    '肾脏病',
    '其他',
    '不详',
  ];
  infectious_disease_history_Options = [
    '无',
    '肺结核',
    '艾滋',
    '梅毒',
    '其他',
    '不详',
  ];
  tumor_Options = [
    '大肠癌',
    '鼻咽癌及头颈部肿瘤',
    '乳腺癌',
    '胃癌',
    '肺癌',
    '食管癌',
    '结直肠癌',
    '小肠癌',
    '肝癌',
    '胰腺癌',
    '妇科肿瘤',
    '泌尿系统瘤',
    '血液淋巴系统瘤',
    '神经系统瘤',
    '软组织肉瘤',
    '其他',
    '不详',
  ];
  tumorFam_Options = [
    '大肠癌',
    '鼻咽癌及头颈部肿瘤',
    '乳腺癌',
    '胃癌',
    '肺癌',
    '食管癌',
    '结直肠癌',
    '小肠癌',
    '肝癌',
    '胰腺癌',
    '妇科肿瘤',
    '泌尿系统瘤',
    '血液淋巴系统瘤',
    '神经系统瘤',
    '软组织肉瘤',
    '其他',
    '不详',
  ];
  render() {
    return (
      <Form
        name="pre_history"
        {...layout}
        onFinish={values => {
          values.CliniManifest = values['CliniManifest'].toString();
          values.BasDisHis = values['BasDisHis'].toString();
          values.infDisHis = values['infDisHis'].toString();
          if (values.tumHis) values.tumHis = values['tumHis'].toString();
          if (values.tumFamHis)
            values.tumFamHis = values['tumFamHis'].toString();
          if (values.smokingHis)
            values.smokingHis = JSON.stringify(values['smokingHis']);
          PastHissave({ id: this.state.id, ...values });
        }}
      >
        <Form.Item label="临床表现" name="CliniManifest">
          <Checkbox.Group options={this.clinical_manifestation_Options} />
        </Form.Item>

        <Form.Item label="基础疾病史" name="BasDisHis">
          <Checkbox.Group options={this.underlying_disease_history_Options} />
        </Form.Item>

        <Form.Item label="传染疾病史" name="infDisHis">
          <Checkbox.Group options={this.infectious_disease_history_Options} />
        </Form.Item>

        <Form.Item label="肿瘤史" name="tumor">
          <Radio.Group
            onChange={e => {
              this.onChange_state_value('is_tumHis', e.target.value);
            }}
            value={this.state.is_tumHis}
          >
            <Radio value={true}>有</Radio>
            <Radio value={false}>无</Radio>
          </Radio.Group>
        </Form.Item>
        {this.state.is_tumHis ? (
          <Form.Item name="tumHis">
            <Checkbox.Group options={this.tumor_Options} />
          </Form.Item>
        ) : null}

        <Form.Item label="肿瘤家族史" name="tumorFam">
          <Radio.Group
            onChange={e => {
              this.onChange_state_value('is_tumFamHis', e.target.value);
            }}
            value={this.state.is_tumFamHis}
          >
            <Radio value={true}>有</Radio>
            <Radio value={false}>无</Radio>
          </Radio.Group>
        </Form.Item>
        {this.state.is_tumFamHis ? (
          <Form.Item name="tumFamHis">
            <Checkbox.Group options={this.tumorFam_Options} />
          </Form.Item>
        ) : null}

        <Form.Item label="是否吸烟" name="smoke">
          <Radio.Group
            onChange={this.onChange_smoke}
            value={this.state.is_smoke}
          >
            <Radio value={true}>有</Radio>
            <Radio value={false}>无</Radio>
          </Radio.Group>
        </Form.Item>
        {this.state.is_smoke ? (
          <Form.Item label="吸烟史">
            <Form.Item
              label="累积吸烟时间（年）"
              name={['smokingHis', 'smokeYearAvg']}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="日平均吸烟量（支）"
              name={['smokingHis', 'smokeDayAvg']}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item label="是否戒烟" name={['smokingHis', 'stopSmoke']}>
              <Radio.Group
                onChange={this.onChange_stopsmoke}
                value={this.state.stop_smoke}
              >
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>
            </Form.Item>
            {this.state.stop_smoke ? (
              <Form.Item
                label="戒烟时间（年）"
                name={['smokingHis', 'stopSmokeHis']}
              >
                <InputNumber />
              </Form.Item>
            ) : null}
          </Form.Item>
        ) : null}

        <Form.Item label="是否饮酒" name="drink">
          <Radio.Group
            onChange={this.onChange_drink}
            value={this.state.is_drink}
          >
            <Radio value={true}>有</Radio>
            <Radio value={false}>无</Radio>
          </Radio.Group>
        </Form.Item>
        {this.state.is_drink ? (
          <Form.Item label="吸烟史">
            <Form.Item
              label="累积饮酒时间（年）"
              name={['drinkingHis', 'drinkYearAvg']}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="日平饮酒烟量（支）"
              name={['drinkingHis', 'drinkDayAvg']}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item label="是否戒酒" name={['drinkingHis', 'stopDrink']}>
              <Radio.Group
                onChange={this.onChange_stopdrink}
                value={this.state.stop_drink}
              >
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
            {this.state.stop_drink ? (
              <Form.Item
                label="戒酒时间（年）"
                name={['drinkingHis', 'stopDringHis']}
              >
                <InputNumber />
              </Form.Item>
            ) : null}
          </Form.Item>
        ) : null}
        <Form.Item label="是否长期使用激素治疗" name="hormone">
          <Radio.Group
            onChange={this.onChange_hormone}
            value={this.state.is_hormone}
          >
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Form.Item>
        {this.state.is_hormone ? (
          <Form.Item label="激素使用史" name="hormoneUseHis">
            <Hormone />
          </Form.Item>
        ) : null}
        <Form.Item label="是否长期使用其他药物" name="drug">
          <Radio.Group
            onChange={this.onChange_medicine}
            value={this.state.is_medicine}
          >
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Form.Item>
        {this.state.is_medicine ? (
          <Form.Item label="药物使用史" name="drugUseHis">
            {/* <Medicine /> */}
          </Form.Item>
        ) : null}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default PreHistory;
