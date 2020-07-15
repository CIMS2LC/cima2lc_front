import React from 'react';
import { Form, Divider, Rate, Input, Button, Col, Row, Radio } from 'antd';
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
    MCV: {
      name: '平均RBC体积',
      unit: 'FL',
    },
    MCH: {
      name: 'RBC平均HGB',
      unit: 'PG',
    },
    MCHC: {
      name: '平均HGB浓度',
      unit: 'G/L',
    },
    RDWCV: {
      name: 'RBC分布宽度-CV',
      unit: '%',
    },
    RDWSD: {
      name: 'RBC分布宽度-SD',
      unit: 'FL',
    },
    WBC: {
      name: '白细胞计数',
      unit: '×10^9/L',
    },
    'GRAN#': {
      name: '中性粒细胞计数',
      unit: '×10^9/L',
    },
    'LYM#': {
      name: '淋巴细胞计数',
      unit: '×10^9/L',
    },
    'EOS#': {
      name: '嗜酸性粒细胞计数',
      unit: '×10^9/L',
    },
    'MID#': {
      name: '单核细胞计数',
      unit: '×10^9/L',
    },
    'BASO#': {
      name: '嗜碱性粒细胞计数',
      unit: '×10^9/L',
    },
    PLT: {
      name: '血小板计数',
      unit: '×10^9/L',
    },
    LYM: {
      name: '淋巴细胞%',
      unit: '%',
    },
    MID: {
      name: '单核细胞%',
      unit: '%',
    },
    GRAN: {
      name: '中性粒细胞%',
      unit: '%',
    },
    EOS: {
      name: '嗜酸性粒细胞%',
      unit: '%',
    },
    BASO: {
      name: '嗜碱性粒细胞%',
      unit: '%',
    },
    '': {
      name: '中性淋巴比值',
      unit: '/',
    },
  },
  血生化: {
    TP: {
      name: '总蛋白',
      unit: 'g/L',
    },
    ALB: {
      name: '白蛋白',
      unit: 'g/L',
    },
    GLO: {
      name: '球蛋白',
      unit: 'g/L',
    },
    ALT: {
      name: '丙氨酸氨基转移酶',
      unit: 'U/L',
    },
    AST: {
      name: '门冬氨酸氨基转氨酶',
      unit: 'U/L',
    },
    LDH: {
      name: '乳酸脱氢酶',
      unit: 'U/L',
    },
    GGT: {
      name: '谷氨酰基转肽酶',
      unit: 'U/L',
    },
    TBIL: {
      name: '总胆红素',
      unit: 'μmol/L',
    },
    DBIL: {
      name: '直接胆红素',
      unit: 'μmol/L',
    },
    IBIL: {
      name: '间接胆红素',
      unit: 'μmol/L',
    },
    GLU: {
      name: '血糖',
      unit: 'mmol/L',
    },
    TC: {
      name: '总胆固醇',
      unit: 'mmol/L',
    },
    LDL: {
      name: '低密度脂蛋白',
      unit: 'mmol/L',
    },
    HDL: {
      name: '高密度脂蛋白',
      unit: 'mmol/L',
    },
    TG: {
      name: '甘油酸酯',
      unit: 'mmol/L',
    },
    UREA: {
      name: '尿素',
      unit: 'mmol/L',
    },
    ALP: {
      name: '碱性磷酸酶',
      unit: 'U/L',
    },
    CREA: {
      name: '肌酐',
      unit: 'μmol/L',
    },
    UA: {
      name: '尿酸',
      unit: 'μmol/L',
    },
    CO2: {
      name: '二氧化碳',
      unit: 'mmol/L',
    },
    K: {
      name: '钾',
      unit: 'mmol/L',
    },
    Na: {
      name: '钠',
      unit: 'mmol/L',
    },
    Cl: {
      name: '氯',
      unit: 'mmol/L',
    },
    Ca: {
      name: '钙',
      unit: 'mmol/L',
    },
    Mg: {
      name: '镁',
      unit: 'mmol/L',
    },
    P: {
      name: '磷',
      unit: 'mmol/L',
    },
  },
  甲状腺功能: {
    FT3: {
      name: '游离三碘甲状腺原',
      unit: 'pmol/L',
    },
    FT4: {
      name: '游离甲状腺素',
      unit: 'pmol/L',
    },
    TSH: {
      name: '促甲状腺激素',
      unit: 'UIU/ML',
    },
  },
  凝血: {
    PT: {
      name: '凝血酶原时间',
      unit: 's',
    },
    APTT: {
      name: '活化部分凝血酶时间',
      unit: 's',
    },
    TT: {
      name: '凝血酶时间',
      unit: 's',
    },
    FIB: {
      name: '纤维蛋白原浓度',
      unit: 'mg/dL',
    },
    INR: {
      name: '国际标准化比值',
      unit: '/',
    },
    'D-dimer': {
      name: 'D-二聚体',
      unit: 'mg/L',
    },
  },
  心衰心梗: {
    LDH: {
      name: '乳酸脱氢酶',
      unit: 'U/L',
    },
    CK: {
      name: '肌酸激酶',
      unit: 'U/L',
    },
    'CK-MB': {
      name: '肌酸激酶同工酶',
      unit: 'U/L',
    },
    cTnI: {
      name: '心肌肌钙蛋白I',
      unit: 'U/L',
    },
    cTnT: {
      name: '心肌肌钙蛋白T',
      unit: 'U/L',
    },
    MYO: {
      name: '肌红蛋白',
      unit: 'U/L',
    },
    BNP: {
      name: '脑钠肽',
      unit: 'U/L',
    },
    'NT-proBNP': {
      name: '氨基末端脑钠肽前体',
      unit: 'U/L',
    },
  },
  细胞因子: {
    'TNF-alpha': {
      name: '肿瘤坏死因子alpha',
      unit: 'pg/ml',
    },
    'IL-1beta': {
      name: '白介素1beta',
      unit: 'pg/ml',
    },
    'IL-2R': {
      name: '白介素2受体',
      unit: 'U/L',
    },
    'IL-6': {
      name: '白介素6',
      unit: 'pg/ml',
    },
    'IL-8': {
      name: '白介素8',
      unit: 'pg/ml',
    },
    'IL-10': {
      name: '白介素10',
      unit: 'pg/ml',
    },
  },
  淋巴细胞亚群: {
    'CD19#': {
      name: 'B淋巴细胞绝对值',
      unit: 'cells/uL',
    },
    'CD3#': {
      name: 'T淋巴细胞绝对值',
      unit: 'cells/uL',
    },
    'CD4#': {
      name: 'Th淋巴细胞绝对值',
      unit: 'cells/uL',
    },
    'CD8#': {
      name: 'Ts淋巴细胞绝对值',
      unit: 'cells/uL',
    },
    'CD16+56': {
      name: '自然杀伤细胞绝对值',
      unit: 'cells/uL',
    },
    'LYMPH###': {
      name: '淋巴细胞数',
      unit: 'cells/uL',
    },
    CD19: {
      name: 'B淋巴细胞',
      unit: '%',
    },
    CD3: {
      name: 'T淋巴细胞',
      unit: '%',
    },
    CD4: {
      name: 'Th淋巴细胞',
      unit: '%',
    },
    CD8: {
      name: 'Ts淋巴细胞',
      unit: '%',
    },
    'CD4/CD8': {
      name: 'Th淋巴细胞/ Ts淋巴细胞',
      unit: '/',
    },
    CD56: {
      name: '自然杀伤细胞',
      unit: '%',
    },
    'CD3+CD8+#': {
      name: 'CD3+CD8+绝对值',
      unit: 'cells/uL',
    },
    'CD3+CD8+': {
      name: 'CD3+CD8+',
      unit: '%',
    },
    'CD3+CD4+#': {
      name: 'CD3+CD4+绝对值',
      unit: 'cells/uL',
    },
    'CD3+CD4+': {
      name: 'CD3+CD4+',
      unit: '%',
    },
    'CD3-CD(16+56)#': {
      name: 'CD3-CD(16+56)绝对值',
      unit: 'cells/uL',
    },
    'CD3-CD(16+56)': {
      name: 'CD3-CD(16+56)',
      unit: '%',
    },
    'CD3-CD19+#': {
      name: 'CD3-CD19+绝对值',
      unit: 'cells/uL',
    },
    'CD3-CD19+': {
      name: 'CD3-CD19+',
      unit: '%',
    },
    'CD8+CD28+': {
      name: 'CD8+CD28+',
      unit: '%',
    },
    'CD20+': {
      name: 'CD20+',
      unit: '%',
    },
    'HLA-DR+': {
      name: 'HLA-DR+',
      unit: '%',
    },
    'CD3+/HLA-DR+': {
      name: 'CD3+/HLA-DR+',
      unit: '%',
    },
    'CD3+/HLA-DR-': {
      name: 'CD3+/HLA-DR-',
      unit: '%',
    },
    'CD3-/HLA-DR+': {
      name: 'CD3-/HLA-DR+',
      unit: '%',
    },
    'CD4+CD25+CD127low': {
      name: 'CD4+CD25+CD127low',
      unit: '%',
    },
  },
  尿常规: {
    UPH: {
      name: '酸碱度',
      unit: '',
    },
    UGLU: {
      name: '尿糖',
      unit: '',
    },
    LEU: {
      name: '尿白细胞',
      unit: '',
    },
    ERY: {
      name: '尿红细胞',
      unit: '',
    },
    NIT: {
      name: '尿亚硝酸',
      unit: '',
    },
    BIL: {
      name: '尿胆红素',
      unit: '',
    },
    USG: {
      name: '尿比重',
      unit: '',
    },
    KET: {
      name: '尿酮体',
      unit: '',
    },
    BLD: {
      name: '尿隐血',
      unit: '',
    },
    PRO: {
      name: '尿蛋白',
      unit: '',
    },
    UBG: {
      name: '尿胆元',
      unit: '',
    },
    COL: {
      name: '尿颜色',
      unit: '',
    },
    CLA: {
      name: '尿透明度',
      unit: '',
    },
  },
  肿瘤标志物: {
    CEA: {
      name: '癌胚抗原',
      unit: 'NG/ML',
    },
    NSE: {
      name: '神经元特异烯醇化酶',
      unit: 'NG/ML',
    },
    'pro-GPR': {
      name: '胃泌素释放肽前体',
      unit: 'NG/ML',
    },
    CYFRA: {
      name: 'CYFRA21-1',
      unit: 'NG/ML',
    },
    FERR: {
      name: '铁蛋白',
      unit: 'NG/ML',
    },
    AFP: {
      name: '甲胎蛋白',
      unit: 'NG/ML',
    },
    SCCA: {
      name: '鳞癌相关抗原',
      unit: 'NG/ML',
    },
  },
  肺功能: {
    'FVC(L)': {
      name: '用力肺活量',
      unit: '',
    },
    'FEV1/FVC(%)': {
      name: '用力呼气一秒率',
      unit: '',
    },
    'MEF(L/S)': {
      name: '用力呼气中期流速',
      unit: '',
    },
    'MEF25(L/S)': {
      name: '25%用力呼气流速',
      unit: '',
    },
    'MEF50(L/S)': {
      name: '50%用力呼气流速',
      unit: '',
    },
    'MEF75(L/S)': {
      name: '75%用力呼气流速',
      unit: '',
    },
    'TLC’sb(L)': {
      name: '肺总量',
      unit: '',
    },
    'RV’(L)': {
      name: '残气容积',
      unit: '',
    },
    'RV’/TLC’(%)': {
      name: '残气容积/肺总量比',
      unit: '',
    },
    'VC(L)': {
      name: '肺活量',
      unit: '',
    },
    'DLCO-ex(mL/mmHg/Mi)': {
      name: '无需屏气弥散',
      unit: '',
    },
    'DLCO-sb(mL/mmHg/Mi)': {
      name: '肺一氧化碳弥散量',
      unit: '',
    },
    KCO: {
      name: '比弥散量',
      unit: '',
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
    Object.keys(labor_inspect).map(item => {
      Object.keys(labor_inspect[item]).map(para => {
        this.state[`${item}_${para}`] = 0;
      });
    });
    console.log(this.state);
  }
  state = {
    evalution: 0,
  };
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
        {Object.keys(labor_inspect).map(item => {
          return (
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
                return (
                  <Row>
                    <Col span={4}>
                      <label>{para}</label>
                    </Col>
                    <Col span={4}>
                      <label>{labor_inspect[item][para]['name']}</label>
                    </Col>
                    <Col span={4}>
                      <Form.Item name={`${para}_value`}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <label>{labor_inspect[item][para]['unit']}</label>
                    </Col>
                    <Col span={4}>
                      <Form.Item name={`${para}_meaning`}>
                        <Radio.Group
                          onChange={e => {
                            this.setState({
                              [`${item}_${para}`]: e.target.value,
                            });
                            console.log(this.state[`${item}_${para}`]);
                          }}
                          value={this.state[`${item}_${para}`]}
                        >
                          <Radio value={0}>正常</Radio>
                          <Radio value={1}>异常</Radio>
                        </Radio.Group>
                        {this.state[`${item}_${para}`] ? (
                          <Rate
                          // character={({ index }) => {
                          //   return index + 1;
                          // }}
                          />
                        ) : null}
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name={`${para}_remark`}>
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}
            </div>
          );
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
