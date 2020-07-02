import React from 'react';
import { Form, Divider, Rate, Input, Button } from 'antd';

class LaborInspect extends React.Component {
  blood_routine_examination_labels = [
    'Hb(g/L)',
    'RBC_B(×10¹²/L)',
    'WBC(×10⁹/L)',
    'Plt(×10⁹L)',
    'PT(S)',
  ];
  piss_routine_examination_labels = [
    '白细胞(个/HP)',
    '红细胞(个/HP)',
    '尿蛋白(＋/－)',
  ];
  blood_biochemistry_labels = [
    'ALT(IU/L)',
    'AST(IU/L)',
    'TBIL(umol/1)',
    'DBIL(umol/1)',
    'ALB(g/L)',
    'Cr(umol/L)',
    'BUN(mmol/1)',
    'Glu(mmol/L)',
    'K(mmol/L)',
    'Na(mmol/L)',
    'Cl(mmol/L)',
    'P(mmol/L)',
  ];
  tumor_marker_labels = ['CEA(ng/ml)', 'SCC(U/ml)', 'NSE(u/ml)'];
  render() {
    return (
      <Form
        name="labor_inspect"
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 4,
        }}
      >
        血常规及凝血功能
        <Divider />
        {this.blood_routine_examination_labels.map(item => (
          <Form.Item label={item} name={item}>
            <div>
              <Input maxLength={18} />
              临床意义判定
              <Rate count={4} />
            </div>
          </Form.Item>
        ))}
        尿常规
        <Divider />
        {this.piss_routine_examination_labels.map(item => (
          <Form.Item label={item} name={item}>
            <Input maxLength={18} />
            临床意义判定
            <Rate count={4} />
          </Form.Item>
        ))}
        血生化
        <Divider />
        {this.blood_biochemistry_labels.map(item => (
          <Form.Item label={item} name={item}>
            <Input maxLength={18} />
            临床意义判定
            <Rate count={4} />
          </Form.Item>
        ))}
        肿瘤标志物
        <Divider />
        {this.tumor_marker_labels.map(item => (
          <Form.Item label={item} name={item}>
            <Input maxLength={18} />
            临床意义判定
            <Rate count={4} />
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default () => <LaborInspect />;
