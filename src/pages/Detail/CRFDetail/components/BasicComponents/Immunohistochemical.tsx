import React from 'react';
import { Form, Radio, Button, Input } from 'antd';
import { ImmunohisItem } from '../../data';
import { Immunohissave, Immunohisupdate } from '../../service';

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 8,
  },
};
const immunohistochemical_labels = [
  'ALKD5F3',
  'ALKD5F3N',
  'CAIX',
  'CAM52',
  'CD10',
  'CD34',
  'CD56',
  'CD117',
  'CDX2',
  'CEA',
  'CgA',
  'CK',
  'CK56',
  'CK7',
  'CK818',
  'CK19',
  'CK20',
  'Cyn',
  'DLL3',
  'EMA',
  'ERCC1',
  'LCA',
  'MCM2',
  'NapsinA',
  'P16',
  'P40',
  'p53',
  'P63',
  'PAX2',
  'PAX8',
  'PCK',
  'PDL1',
  'RRM1',
  'SATB2',
  'Syn',
  'TTF1',
  'VEGFC',
  'Villin',
  'Villinco',
];

class Immunohistochemical extends React.Component {
  constructor(props: any) {
    super(props);
    this.pid = props.pid;
    this.initialValues = props.initialValues;
    if (this.initialValues) {
      this.id = this.initialValues['id'];
      this.pid = this.initialValues['pid'] || this.props.pid;
    }
  }
  id = -1;
  pid = -1;
  render() {
    return (
      <Form
        name="immunohistochemical"
        {...layout}
        initialValues={this.initialValues}
        onFinish={async values => {
          if (this.id != -1) {
            const res = await Immunohisupdate({
              id: this.id,
              pid: this.pid,
              ...values,
            });
            if (res.code == 200) {
              console.log('更新成功');
            } else {
              console.log('更新失败');
            }
          } else {
            const res = await Immunohissave({
              pid: this.pid,
              treNum: 0,
              ...values,
            });
            if (res.code == 200) {
              this.id = res.id;
              console.log('提交成功');
            } else {
              console.log('提交失败');
            }
          }
        }}
      >
        {immunohistochemical_labels.map(item => (
          <Form.Item label={item} name={item}>
            <Radio.Group>
              <Radio value={1}>-</Radio>
              <Radio value={2}>±</Radio>
              <Radio value={3}>+</Radio>
              <Radio value={4}>++</Radio>
              <Radio value={5}>+++</Radio>
            </Radio.Group>
          </Form.Item>
        ))}
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

export default Immunohistochemical;
