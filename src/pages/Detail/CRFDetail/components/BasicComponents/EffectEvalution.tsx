import React from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 8,
  },
};

const { Option } = Select;
class EffectEvalution extends React.Component {
  constructor(props: any) {
    super(props);
    this.pid = props.pid;
    this.initialValues = props.initialValues;
    if (this.initialValues) {
      if (this.initialValues.proDate)
        this.initialValues.proDate = moment(this.initialValues.proDate);
      if (this.initialValues.beEffEvaDate)
        this.initialValues.beEffEvaDate = moment(
          this.initialValues.beEffEvaDate,
        );
    }
  }
  initialValues = {};
  pid = -1;
  id = -1;
  best_effect_evalution = [
    { label: 'PD-进展', value: 1 },
    { label: 'SD-稳定', value: 2 },
    { label: 'PR-部分缓解', value: 3 },
    { label: 'CR-完全缓解', value: 4 },
    { label: '术后未发现新病灶', value: 5 },
  ];

  onfinish = async (values: any) => {
    if (values.proDate) values.proDate = values.proDate.format('YYYY-MM-DD');
    if (values.beEffEvaDate)
      values.beEffEvaDate = values.beEffEvaDate.format('YYYY-MM-DD');

    if (this.id != -1) {
      console.log(values.videography);
      const res = await treRecupdate({
        //service里面加请求
        id: this.id,
        pid: this.props.pid,
        ...values,
      });
      if (res.code == 200) {
        console.log('更新成功');
      } else {
        console.log('更新失败');
      }
    } else {
      const res = await treRecsave({ pid: this.props.pid, ...values });
      if (res.code == 200) {
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
      <Form
        name="effect_evalution"
        {...layout}
        onFinish={this.onfinish}
        initialValues={this.initialValues}
      >
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

export default EffectEvalution;
