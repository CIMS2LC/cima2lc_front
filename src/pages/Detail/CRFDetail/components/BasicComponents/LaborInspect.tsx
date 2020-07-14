import React from 'react';
import { Form, Divider, Rate, Input, Button, Col, Row } from 'antd';
import EditableTable from '@/pages/BasicComponents/EditableTable';

const labor_inspect = {
  血常规: {
    RBC: {
      name: '红细胞计数',
      unit: '×10^12/L',
    },
    HGb: {
      name: '血红蛋白',
      unit: 'G/L',
    },
    HCT: {
      name: '红细胞压积',
      unit: '%',
    },
  },
};
// blood_routine_examination_labels = [
//   'Hb(g/L)',
//   'RBC_B(×10¹²/L)',
//   'WBC(×10⁹/L)',
//   'Plt(×10⁹L)',
//   'PT(S)',
// ];
// piss_routine_examination_labels = [
//   '白细胞(个/HP)',
//   '红细胞(个/HP)',
//   '尿蛋白(＋/－)',
// ];
// blood_biochemistry_labels = [
//   'ALT(IU/L)',
//   'AST(IU/L)',
//   'TBIL(umol/1)',
//   'DBIL(umol/1)',
//   'ALB(g/L)',
//   'Cr(umol/L)',
//   'BUN(mmol/1)',
//   'Glu(mmol/L)',
//   'K(mmol/L)',
//   'Na(mmol/L)',
//   'Cl(mmol/L)',
//   'P(mmol/L)',
// ];
// tumor_marker_labels = ['CEA(ng/ml)', 'SCC(U/ml)', 'NSE(u/ml)'];
class LaborInspect extends React.Component {
  constructor(prop: any) {
    super(prop);
    console.log(labor_inspect);
  }
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
        <div>
          <Row>
            <Col span={24}>
              <label>123</label>
            </Col>
          </Row>
        </div>
        {Object.keys(labor_inspect).map(item => {
          <div>
            <div>
              <Row>
                <Col span={24}>
                  <label>{item}</label>
                </Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col span={24}>
                  <label>{item}</label>
                </Col>
              </Row>
              <Row>
                <Col span={4}>
                  <label>代码</label>
                </Col>
                <Col span={4}>
                  <label>项目</label>
                </Col>
                <Col span={4}>
                  <label>测定值</label>
                </Col>
                <Col span={4}>
                  <label>单位</label>
                </Col>
                <Col span={4}>
                  <label>临床意义判断</label>
                </Col>
                <Col span={4}>
                  <label>备注</label>
                </Col>
              </Row>
              {Object.keys(labor_inspect[item]).map(para => {
                <Row>
                  <Col span={4}>
                    <label>{item}</label>
                  </Col>
                  <Col span={4}>
                    <label>{labor_inspect[item][para]['name']}</label>
                  </Col>
                  <Col span={4}>
                    <Form.Item label={`${item}_value`} name={`${item}_value`}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <label>{labor_inspect[item][para]['unit']}</label>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      label={`${item}_meaning`}
                      name={`${item}_meaning`}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item label={`${item}_remark`} name={`${item}_remark`}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>;
              })}
            </div>
          </div>;
        })}
        {/* 血常规及凝血功能
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
        ))} */}
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
