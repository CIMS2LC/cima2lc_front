import React from 'react';
import { Form, Radio, Input, Switch, Button } from 'antd';

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 8,
  },
};

class MolecularDetection extends React.Component {
  state = {
    TMB_value: false,
  };

  TMB_onChange = (checked: any) => {
    this.setState({
      TMB_value: !checked,
    });
    console.log(`switch to ${checked}`);
  };

  molecular_detection_labels = [
    'ALK',
    'BIM',
    'BRAF',
    'cMET',
    'EGFR',
    'HER-2',
    'KRAS',
    'PD-L1',
    'PIK3CA',
    'ROS1',
    'RET',
    'UGT1A1',
  ];

  render() {
    return (
      <Form name="molecular_detection" {...layout}>
        {this.molecular_detection_labels.map(item => (
          <Form.Item label={item} name={item}>
            <Radio.Group>
              <Radio value={0}>无</Radio>
              <Radio value={-1}>阴性</Radio>
              <Radio value={1}>阳性</Radio>
            </Radio.Group>
          </Form.Item>
        ))}
        <Form.Item label="MSI" name="MSI">
          <Radio.Group>
            <Radio value={0}>MSS</Radio>
            <Radio value={-1}>MSIH</Radio>
            <Radio value={1}>MSIL</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="分子检测" name="MD">
          <Radio.Group>
            <Radio value={0}>ARMS</Radio>
            <Radio value={-1}>FISH</Radio>
            <Radio value={1}>二代测序</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="TMB(/Mb)" name="TMB">
          <Input disabled={this.state.TMB_value} />
          <Switch
            checkedChildren="已检测"
            unCheckedChildren="未检测"
            defaultChecked
            onChange={this.TMB_onChange}
          />
        </Form.Item>
        <Form.Item label="其他" name="other">
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

export default () => <MolecularDetection />;
