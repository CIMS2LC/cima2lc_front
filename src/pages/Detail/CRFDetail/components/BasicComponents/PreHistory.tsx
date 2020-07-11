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

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 8,
  },
};

class PreHistory extends React.Component {
  state = {
    is_smoke: 0,
    stop_smoke: 0,
    is_drink: 0,
    stop_drink: 0,
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
  clinical_manifestation_onChange = () => {};
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
  underlying_disease_history_onChange = () => {};
  infectious_disease_history_Options = [
    '无',
    '肺结核',
    '艾滋',
    '梅毒',
    '其他',
    '不详',
  ];
  infectious_disease_history_onChange = () => {};

  render() {
    return (
      <Form name="pre_history" {...layout}>
        <Form.Item label="临床表现" name="clinical_manifestation">
          <Checkbox.Group
            options={this.clinical_manifestation_Options}
            onChange={this.clinical_manifestation_onChange}
          />
        </Form.Item>

        <Form.Item label="基础疾病史" name="underlying_disease_history">
          <Checkbox.Group
            options={this.underlying_disease_history_Options}
            onChange={this.underlying_disease_history_onChange}
          />
        </Form.Item>

        <Form.Item label="传染疾病史" name="infectious_disease_history">
          <Checkbox.Group
            options={this.infectious_disease_history_Options}
            onChange={this.infectious_disease_history_onChange}
          />
        </Form.Item>

        <Form.Item label="肿瘤史" name="tumor_history">
          <Radio.Group>
            <Radio value={1}>有</Radio>
            <Radio value={0}>无</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="肿瘤家族史" name="tumor_family_history">
          <Radio.Group>
            <Radio value={1}>有</Radio>
            <Radio value={0}>无</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="是否吸烟" name="smoking">
          <Radio.Group
            onChange={this.onChange_smoke}
            value={this.state.is_smoke}
          >
            <Radio value={1}>有</Radio>
            <Radio value={0}>无</Radio>
          </Radio.Group>
          {this.state.is_smoke ? (
            <div>
              <label>累积吸烟时间（年）</label>
              <InputNumber />
              <label>日平均吸烟量（支）</label>
              <InputNumber />
              <label>是否戒烟</label>
              <Radio.Group
                onChange={this.onChange_stopsmoke}
                value={this.state.stop_smoke}
              >
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>
              {this.state.stop_smoke ? (
                <div>
                  <label>戒烟时间（年）</label>
                  <InputNumber />
                </div>
              ) : null}
            </div>
          ) : null}
        </Form.Item>

        <Form.Item label="是否饮酒" name="drinking">
          <Radio.Group
            onChange={this.onChange_drink}
            value={this.state.is_drink}
          >
            <Radio value={1}>有</Radio>
            <Radio value={0}>无</Radio>
          </Radio.Group>
          {this.state.is_drink ? (
            <div>
              <label>累积饮酒时间（年）</label>
              <InputNumber />
              <label>日平饮酒烟量（支）</label>
              <InputNumber />
              <label>是否戒酒</label>
              <Radio.Group
                onChange={this.onChange_stopdrink}
                value={this.state.stop_drink}
              >
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>
              {this.state.stop_drink ? (
                <div>
                  <label>戒酒时间（年）</label>
                  <InputNumber />
                </div>
              ) : null}
            </div>
          ) : null}
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

export default () => <PreHistory />;
