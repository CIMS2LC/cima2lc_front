import React from 'react';
import { Form, Divider, Rate, Input, Button, Col, Row, Radio } from 'antd';
import EditableTable from '@/pages/BasicComponents/EditableTable';

const labor_inspect = {
  血常规: {
    RBC: {
      name: '红细胞计数',
      unit: '×10^12/L',
      eva: 0,
    },
    HGb: {
      name: '血红蛋白',
      unit: 'G/L',
      eva: 0,
    },
    HCT: {
      name: '红细胞压积',
      unit: '%',
      eva: 0,
    },
    MCV: {
      name: '平均RBC体积',
      unit: 'FL',
      eva: 0,
    },
    MCH: {
      name: 'RBC平均HGB',
      unit: 'PG',
      eva: 0,
    },
    MCHC: {
      name: '平均HGB浓度',
      unit: 'G/L',
      eva: 0,
    },
    RDWCV: {
      name: 'RBC分布宽度-CV',
      unit: '%',
      eva: 0,
    },
    RDWSD: {
      name: 'RBC分布宽度-SD',
      unit: 'FL',
      eva: 0,
    },
    WBC: {
      name: '白细胞计数',
      unit: '×10^9/L',
      eva: 0,
    },
    'GRAN#': {
      name: '中性粒细胞计数',
      unit: '×10^9/L',
      eva: 0,
    },
    'LYM#': {
      name: '淋巴细胞计数',
      unit: '×10^9/L',
      eva: 0,
    },
    'EOS#': {
      name: '嗜酸性粒细胞计数',
      unit: '×10^9/L',
      eva: 0,
    },
    'MID#': {
      name: '单核细胞计数',
      unit: '×10^9/L',
      eva: 0,
    },
    'BASO#': {
      name: '嗜碱性粒细胞计数',
      unit: '×10^9/L',
      eva: 0,
    },
    PLT: {
      name: '血小板计数',
      unit: '×10^9/L',
      eva: 0,
    },
    LYM: {
      name: '淋巴细胞%',
      unit: '%',
      eva: 0,
    },
    MID: {
      name: '单核细胞%',
      unit: '%',
      eva: 0,
    },
    GRAN: {
      name: '中性粒细胞%',
      unit: '%',
      eva: 0,
    },
    EOS: {
      name: '嗜酸性粒细胞%',
      unit: '%',
      eva: 0,
    },
    BASO: {
      name: '嗜碱性粒细胞%',
      unit: '%',
      eva: 0,
    },
    '': {
      name: '中性淋巴比值',
      unit: '/',
      eva: 0,
    },
  },
  血生化: {
    TP: {
      name: '总蛋白',
      unit: 'g/L',
      eva: 0,
    },
    ALB: {
      name: '白蛋白',
      unit: 'g/L',
      eva: 0,
    },
    GLO: {
      name: '球蛋白',
      unit: 'g/L',
      eva: 0,
    },
    ALT: {
      name: '丙氨酸氨基转移酶',
      unit: 'U/L',
      eva: 0,
    },
    AST: {
      name: '门冬氨酸氨基转氨酶',
      unit: 'U/L',
      eva: 0,
    },
    LDH: {
      name: '乳酸脱氢酶',
      unit: 'U/L',
      eva: 0,
    },
    GGT: {
      name: '谷氨酰基转肽酶',
      unit: 'U/L',
      eva: 0,
    },
    TBIL: {
      name: '总胆红素',
      unit: 'μmol/L',
      eva: 0,
    },
    DBIL: {
      name: '直接胆红素',
      unit: 'μmol/L',
      eva: 0,
    },
    IBIL: {
      name: '间接胆红素',
      unit: 'μmol/L',
      eva: 0,
    },
    GLU: {
      name: '血糖',
      unit: 'mmol/L',
      eva: 0,
    },
    TC: {
      name: '总胆固醇',
      unit: 'mmol/L',
      eva: 0,
    },
    LDL: {
      name: '低密度脂蛋白',
      unit: 'mmol/L',
      eva: 0,
    },
    HDL: {
      name: '高密度脂蛋白',
      unit: 'mmol/L',
      eva: 0,
    },
    TG: {
      name: '甘油酸酯',
      unit: 'mmol/L',
      eva: 0,
    },
    UREA: {
      name: '尿素',
      unit: 'mmol/L',
      eva: 0,
    },
    ALP: {
      name: '碱性磷酸酶',
      unit: 'U/L',
      eva: 0,
    },
    CREA: {
      name: '肌酐',
      unit: 'μmol/L',
      eva: 0,
    },
    UA: {
      name: '尿酸',
      unit: 'μmol/L',
      eva: 0,
    },
    CO2: {
      name: '二氧化碳',
      unit: 'mmol/L',
      eva: 0,
    },
    K: {
      name: '钾',
      unit: 'mmol/L',
      eva: 0,
    },
    Na: {
      name: '钠',
      unit: 'mmol/L',
      eva: 0,
    },
    Cl: {
      name: '氯',
      unit: 'mmol/L',
      eva: 0,
    },
    Ca: {
      name: '钙',
      unit: 'mmol/L',
      eva: 0,
    },
    Mg: {
      name: '镁',
      unit: 'mmol/L',
      eva: 0,
    },
    P: {
      name: '磷',
      unit: 'mmol/L',
      eva: 0,
    },
  },
  甲状腺功能: {
    FT3: {
      name: '游离三碘甲状腺原',
      unit: 'pmol/L',
      eva: 0,
    },
    FT4: {
      name: '游离甲状腺素',
      unit: 'pmol/L',
      eva: 0,
    },
    TSH: {
      name: '促甲状腺激素',
      unit: 'UIU/ML',
      eva: 0,
    },
  },
  凝血: {
    PT: {
      name: '凝血酶原时间',
      unit: 's',
      eva: 0,
    },
    APTT: {
      name: '活化部分凝血酶时间',
      unit: 's',
      eva: 0,
    },
    TT: {
      name: '凝血酶时间',
      unit: 's',
      eva: 0,
    },
    FIB: {
      name: '纤维蛋白原浓度',
      unit: 'mg/dL',
      eva: 0,
    },
    INR: {
      name: '国际标准化比值',
      unit: '/',
      eva: 0,
    },
    'D-dimer': {
      name: 'D-二聚体',
      unit: 'mg/L',
      eva: 0,
    },
  },
  心衰心梗: {
    LDH: {
      name: '乳酸脱氢酶',
      unit: 'U/L',
      eva: 0,
    },
    CK: {
      name: '肌酸激酶',
      unit: 'U/L',
      eva: 0,
    },
    'CK-MB': {
      name: '肌酸激酶同工酶',
      unit: 'U/L',
      eva: 0,
    },
    cTnI: {
      name: '心肌肌钙蛋白I',
      unit: 'U/L',
      eva: 0,
    },
    cTnT: {
      name: '心肌肌钙蛋白T',
      unit: 'U/L',
      eva: 0,
    },
    MYO: {
      name: '肌红蛋白',
      unit: 'U/L',
      eva: 0,
    },
    BNP: {
      name: '脑钠肽',
      unit: 'U/L',
      eva: 0,
    },
    'NT-proBNP': {
      name: '氨基末端脑钠肽前体',
      unit: 'U/L',
      eva: 0,
    },
  },
  细胞因子: {
    'TNF-alpha': {
      name: '肿瘤坏死因子alpha',
      unit: 'pg/ml',
      eva: 0,
    },
    'IL-1beta': {
      name: '白介素1beta',
      unit: 'pg/ml',
      eva: 0,
    },
    'IL-2R': {
      name: '白介素2受体',
      unit: 'U/L',
      eva: 0,
    },
    'IL-6': {
      name: '白介素6',
      unit: 'pg/ml',
      eva: 0,
    },
    'IL-8': {
      name: '白介素8',
      unit: 'pg/ml',
      eva: 0,
    },
    'IL-10': {
      name: '白介素10',
      unit: 'pg/ml',
      eva: 0,
    },
  },
  淋巴细胞亚群: {
    'CD19#': {
      name: 'B淋巴细胞绝对值',
      unit: 'cells/uL',
      eva: 0,
    },
    'CD3#': {
      name: 'T淋巴细胞绝对值',
      unit: 'cells/uL',
      eva: 0,
    },
    'CD4#': {
      name: 'Th淋巴细胞绝对值',
      unit: 'cells/uL',
      eva: 0,
    },
    'CD8#': {
      name: 'Ts淋巴细胞绝对值',
      unit: 'cells/uL',
      eva: 0,
    },
    'CD16+56': {
      name: '自然杀伤细胞绝对值',
      unit: 'cells/uL',
      eva: 0,
    },
    'LYMPH###': {
      name: '淋巴细胞数',
      unit: 'cells/uL',
      eva: 0,
    },
    CD19: {
      name: 'B淋巴细胞',
      unit: '%',
      eva: 0,
    },
    CD3: {
      name: 'T淋巴细胞',
      unit: '%',
      eva: 0,
    },
    CD4: {
      name: 'Th淋巴细胞',
      unit: '%',
      eva: 0,
    },
    CD8: {
      name: 'Ts淋巴细胞',
      unit: '%',
      eva: 0,
    },
    'CD4/CD8': {
      name: 'Th淋巴细胞/ Ts淋巴细胞',
      unit: '/',
      eva: 0,
    },
    CD56: {
      name: '自然杀伤细胞',
      unit: '%',
      eva: 0,
    },
    'CD3+CD8+#': {
      name: 'CD3+CD8+绝对值',
      unit: 'cells/uL',
      eva: 0,
    },
    'CD3+CD8+': {
      name: 'CD3+CD8+',
      unit: '%',
      eva: 0,
    },
    'CD3+CD4+#': {
      name: 'CD3+CD4+绝对值',
      unit: 'cells/uL',
      eva: 0,
    },
    'CD3+CD4+': {
      name: 'CD3+CD4+',
      unit: '%',
      eva: 0,
    },
    'CD3-CD(16+56)#': {
      name: 'CD3-CD(16+56)绝对值',
      unit: 'cells/uL',
      eva: 0,
    },
    'CD3-CD(16+56)': {
      name: 'CD3-CD(16+56)',
      unit: '%',
      eva: 0,
    },
    'CD3-CD19+#': {
      name: 'CD3-CD19+绝对值',
      unit: 'cells/uL',
      eva: 0,
    },
    'CD3-CD19+': {
      name: 'CD3-CD19+',
      unit: '%',
      eva: 0,
    },
    'CD8+CD28+': {
      name: 'CD8+CD28+',
      unit: '%',
      eva: 0,
    },
    'CD20+': {
      name: 'CD20+',
      unit: '%',
      eva: 0,
    },
    'HLA-DR+': {
      name: 'HLA-DR+',
      unit: '%',
      eva: 0,
    },
    'CD3+/HLA-DR+': {
      name: 'CD3+/HLA-DR+',
      unit: '%',
      eva: 0,
    },
    'CD3+/HLA-DR-': {
      name: 'CD3+/HLA-DR-',
      unit: '%',
      eva: 0,
    },
    'CD3-/HLA-DR+': {
      name: 'CD3-/HLA-DR+',
      unit: '%',
      eva: 0,
    },
    'CD4+CD25+CD127low': {
      name: 'CD4+CD25+CD127low',
      unit: '%',
      eva: 0,
    },
  },
  尿常规: {
    UPH: {
      name: '酸碱度',
      unit: '',
      eva: 0,
    },
    UGLU: {
      name: '尿糖',
      unit: '',
      eva: 0,
    },
    LEU: {
      name: '尿白细胞',
      unit: '',
      eva: 0,
    },
    ERY: {
      name: '尿红细胞',
      unit: '',
      eva: 0,
    },
    NIT: {
      name: '尿亚硝酸',
      unit: '',
      eva: 0,
    },
    BIL: {
      name: '尿胆红素',
      unit: '',
      eva: 0,
    },
    USG: {
      name: '尿比重',
      unit: '',
      eva: 0,
    },
    KET: {
      name: '尿酮体',
      unit: '',
      eva: 0,
    },
    BLD: {
      name: '尿隐血',
      unit: '',
      eva: 0,
    },
    PRO: {
      name: '尿蛋白',
      unit: '',
      eva: 0,
    },
    UBG: {
      name: '尿胆元',
      unit: '',
      eva: 0,
    },
    COL: {
      name: '尿颜色',
      unit: '',
      eva: 0,
    },
    CLA: {
      name: '尿透明度',
      unit: '',
      eva: 0,
    },
  },
  肿瘤标志物: {
    CEA: {
      name: '癌胚抗原',
      unit: 'NG/ML',
      eva: 0,
    },
    NSE: {
      name: '神经元特异烯醇化酶',
      unit: 'NG/ML',
      eva: 0,
    },
    'pro-GPR': {
      name: '胃泌素释放肽前体',
      unit: 'NG/ML',
      eva: 0,
    },
    CYFRA: {
      name: 'CYFRA21-1',
      unit: 'NG/ML',
      eva: 0,
    },
    FERR: {
      name: '铁蛋白',
      unit: 'NG/ML',
      eva: 0,
    },
    AFP: {
      name: '甲胎蛋白',
      unit: 'NG/ML',
      eva: 0,
    },
    SCCA: {
      name: '鳞癌相关抗原',
      unit: 'NG/ML',
      eva: 0,
    },
  },
  肺功能: {
    'FVC(L)': {
      name: '用力肺活量',
      unit: '',
      eva: 0,
    },
    'FEV1/FVC(%)': {
      name: '用力呼气一秒率',
      unit: '',
      eva: 0,
    },
    'MEF(L/S)': {
      name: '用力呼气中期流速',
      unit: '',
      eva: 0,
    },
    'MEF25(L/S)': {
      name: '25%用力呼气流速',
      unit: '',
      eva: 0,
    },
    'MEF50(L/S)': {
      name: '50%用力呼气流速',
      unit: '',
      eva: 0,
    },
    'MEF75(L/S)': {
      name: '75%用力呼气流速',
      unit: '',
      eva: 0,
    },
    'TLC’sb(L)': {
      name: '肺总量',
      unit: '',
      eva: 0,
    },
    'RV’(L)': {
      name: '残气容积',
      unit: '',
      eva: 0,
    },
    'RV’/TLC’(%)': {
      name: '残气容积/肺总量比',
      unit: '',
      eva: 0,
    },
    'VC(L)': {
      name: '肺活量',
      unit: '',
      eva: 0,
    },
    'DLCO-ex(mL/mmHg/Mi)': {
      name: '无需屏气弥散',
      unit: '',
      eva: 0,
    },
    'DLCO-sb(mL/mmHg/Mi)': {
      name: '肺一氧化碳弥散量',
      unit: '',
      eva: 0,
    },
    KCO: {
      name: '比弥散量',
      unit: '',
      eva: 0,
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
                              evalution: e.target.value,
                            });
                          }}
                          value={this.state.evalution}
                        >
                          <Radio value={0}>正常</Radio>
                          <Radio value={1}>异常</Radio>
                        </Radio.Group>
                        {this.state.evalution ? (
                          <Rate
                            character={({ index }) => {
                              return `o${index + 1}`;
                            }}
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
