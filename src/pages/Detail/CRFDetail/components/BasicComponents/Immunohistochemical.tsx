import React from 'react';
import { Form, Radio, Button, Input } from 'antd';
import { ImmunohisItem } from '../../data';
import { Immunohissave } from '../../service';

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
  'ALKD5F3-N',
  'CAIX',
  'CAM5.2',
  'CD10',
  'CD34',
  'CD56',
  'CD117',
  'CDX-2',
  'CEA',
  'CgA',
  'CK',
  'CK5/6',
  'CK7',
  'CK8/18',
  'CK19',
  'CK20',
  'Cyn',
  'DLL3',
  'EMA',
  'ERCC-1',
  'LCA',
  'MCM2',
  'Napsin A',
  'P16',
  'P40',
  'p53',
  'P63',
  'PAX-2',
  'PAX-8',
  'PCK',
  'PD-L1',
  'SATB2',
  'Syn',
  'TTF1',
  'VEGF-C',
  'Villin',
  'VIM',
];

class Immunohistochemical extends React.Component {
  state = {
    id: this.props.id,
  };
  render() {
    return (
      <Form
        name="immunohistochemical"
        {...layout}
        onFinish={values => {
          Immunohissave({ id: this.state.id, ...values });
        }}
      >
        {immunohistochemical_labels.map(item => (
          <Form.Item label={item} name={item}>
            <Radio.Group>
              <Radio value={1}>-</Radio>
              <Radio value={2}>±</Radio>
              <Radio value={3}>+</Radio>
              <Radio value={4}>++</Radio>
              <Radio value={4}>+++</Radio>
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

export default () => <Immunohistochemical />;
