import React from 'react';
import { Form, Radio, Input, Switch, Button, InputNumber, Select } from 'antd';

const { Option } = Select;

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
    molecular_detection_labels: {
      ALK: 0,
      BIM: 0,
      BRAF: 0,
      cMET: 0,
      EGFR: 0,
      'HER-2': 0,
      KRAS: 0,
      'PD-L1': 0,
      PIK3CA: 0,
      ROS1: 0,
      RET: 0,
      UGT1A1: 0,
    },
  };

  TMB_onChange = (checked: any) => {
    this.setState({
      TMB_value: !checked,
    });
    console.log(`switch to ${checked}`);
  };

  render() {
    return (
      <Form name="molecular_detection" {...layout}>
        {Object.keys(this.state.molecular_detection_labels).map(
          (item: string) => (
            <Form.Item label={item} name={item}>
              <Radio.Group
                onChange={e => {
                  var mdls = this.state.molecular_detection_labels;
                  mdls[item] = e.target.value;
                  this.setState({
                    molecular_detection_labels: mdls,
                  });
                }}
              >
                <Radio value={0}>无</Radio>
                <Radio value={-1}>阴性</Radio>
                <Radio value={1}>阳性</Radio>
              </Radio.Group>
              {this.state.molecular_detection_labels[item] == 1 ? (
                <div>
                  <div>
                    <label>检测样本</label>
                    <Input />
                  </div>
                  <div>
                    <label>检测方法</label>
                    <Select style={{ width: 120 }} onChange={() => {}}>
                      <Option value="ARMS">ARMS</Option>
                      <Option value="FISH">FISH</Option>
                      <Option value="NGS">NGS</Option>
                    </Select>
                  </div>
                  <div>
                    <label>检测描述</label>
                    <Input />
                  </div>
                </div>
              ) : null}
            </Form.Item>
          ),
        )}
        <Form.Item label="MSI" name="MSI">
          <Radio.Group>
            <Radio value={0}>MSS</Radio>
            <Radio value={-1}>MSIH</Radio>
            <Radio value={1}>MSIL</Radio>
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
