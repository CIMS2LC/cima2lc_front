import React from 'react';
import {
  Form,
  Divider,
  Rate,
  Input,
  Button,
  Col,
  Row,
  Radio,
  DatePicker,
  Upload,
  Popconfirm,
  InputNumber,
  Select,
  message,
} from 'antd';
import EditableTable from '@/pages/BasicComponents/EditableTable';
import { UploadOutlined } from '@ant-design/icons';
import './table.less';
import moment from 'moment';
import { getCookie } from '@/pages/BasicComponents/request';
import {
  imageExamsupdate,
  otherExamsupdate,
  lungupdate,
  tumorMarkerupdate,
  urineRoutineupdate,
  lymSubsetsupdate,
  cytokinesupdate,
  myocardialEnzymeupdate,
  coagulationupdate,
  thyroidupdate,
  bloodBioupdate,
  bloodRoutineupdate,
} from '../../service';

const labor_inspect = {
  血常规: {
    RBC: {
      name: '红细胞计数',
      unit: '×10^12/L',
      key: 'RBC',
    },
    HGb: {
      name: '血红蛋白',
      unit: 'G/L',
      key: 'HGb',
    },
    HCT: {
      name: '红细胞压积',
      unit: '%',
      key: 'HCT',
    },
    MCV: {
      name: '平均RBC体积',
      unit: 'FL',
      key: 'MCV',
    },
    MCH: {
      name: 'RBC平均HGB',
      unit: 'PG',
      key: 'MCH',
    },
    MCHC: {
      name: '平均HGB浓度',
      unit: 'G/L',
      key: 'MCHC',
    },
    RDWCV: {
      name: 'RBC分布宽度-CV',
      unit: '%',
      key: 'RDWCV',
    },
    RDWSD: {
      name: 'RBC分布宽度-SD',
      unit: 'FL',
      key: 'RDWSD',
    },
    WBC: {
      name: '白细胞计数',
      unit: '×10^9/L',
      key: 'WBC',
    },
    'GRAN#': {
      name: '中性粒细胞计数',
      unit: '×10^9/L',
      key: 'GRAN_',
    },
    'LYM#': {
      name: '淋巴细胞计数',
      unit: '×10^9/L',
      key: 'LYM_',
    },
    'EOS#': {
      name: '嗜酸性粒细胞计数',
      unit: '×10^9/L',
      key: 'EOS_',
    },
    'MID#': {
      name: '单核细胞计数',
      unit: '×10^9/L',
      key: 'MID_',
    },
    'BASO#': {
      name: '嗜碱性粒细胞计数',
      unit: '×10^9/L',
      key: 'BASO_',
    },
    PLT: {
      name: '血小板计数',
      unit: '×10^9/L',
      key: 'PLT',
    },
    LYM: {
      name: '淋巴细胞%',
      unit: '%',
      key: 'LYM',
    },
    MID: {
      name: '单核细胞%',
      unit: '%',
      key: 'MID',
    },
    GRAN: {
      name: '中性粒细胞%',
      unit: '%',
      key: 'GRAN',
    },
    EOS: {
      name: '嗜酸性粒细胞%',
      unit: '%',
      key: 'EOS',
    },
    BASO: {
      name: '嗜碱性粒细胞%',
      unit: '%',
      key: 'BASO',
    },
    NEUT: {
      name: '中性淋巴比值',
      unit: '/',
      key: 'NEUT',
    },
  },
  血生化: {
    TP: {
      name: '总蛋白',
      unit: 'g/L',
      key: 'TP',
    },
    ALB: {
      name: '白蛋白',
      unit: 'g/L',
      key: 'ALB',
    },
    GLO: {
      name: '球蛋白',
      unit: 'g/L',
      key: 'GLO',
    },
    ALT: {
      name: '丙氨酸氨基转移酶',
      unit: 'U/L',
      key: 'ALT',
    },
    AST: {
      name: '门冬氨酸氨基转氨酶',
      unit: 'U/L',
      key: 'AST',
    },
    LDH: {
      name: '乳酸脱氢酶',
      unit: 'U/L',
      key: 'LDH',
    },
    GGT: {
      name: '谷氨酰基转肽酶',
      unit: 'U/L',
      key: 'GGT',
    },
    TBIL: {
      name: '总胆红素',
      unit: 'μmol/L',
      key: 'TBIL',
    },
    DBIL: {
      name: '直接胆红素',
      unit: 'μmol/L',
      key: 'DBIL',
    },
    IBIL: {
      name: '间接胆红素',
      unit: 'μmol/L',
      key: 'IBIL',
    },
    GLU: {
      name: '血糖',
      unit: 'mmol/L',
      key: 'GLU',
    },
    TC: {
      name: '总胆固醇',
      unit: 'mmol/L',
      key: 'TC',
    },
    LDL: {
      name: '低密度脂蛋白',
      unit: 'mmol/L',
      key: 'LDL',
    },
    HDL: {
      name: '高密度脂蛋白',
      unit: 'mmol/L',
      key: 'hDL',
    },
    TG: {
      name: '甘油酸酯',
      unit: 'mmol/L',
      key: 'TG',
    },
    UREA: {
      name: '尿素',
      unit: 'mmol/L',
      key: 'UREA',
    },
    ALP: {
      name: '碱性磷酸酶',
      unit: 'U/L',
      key: 'ALP',
    },
    CREA: {
      name: '肌酐',
      unit: 'μmol/L',
      key: 'CREA',
    },
    UA: {
      name: '尿酸',
      unit: 'μmol/L',
      key: 'UA',
    },
    CO2: {
      name: '二氧化碳',
      unit: 'mmol/L',
      key: 'CO2',
    },
    K: {
      name: '钾',
      unit: 'mmol/L',
      key: 'K',
    },
    Na: {
      name: '钠',
      unit: 'mmol/L',
      key: 'Na',
    },
    Cl: {
      name: '氯',
      unit: 'mmol/L',
      key: 'Cl',
    },
    Ca: {
      name: '钙',
      unit: 'mmol/L',
      key: 'Ca',
    },
    Mg: {
      name: '镁',
      unit: 'mmol/L',
      key: 'Mg',
    },
    P: {
      name: '磷',
      unit: 'mmol/L',
      key: 'P',
    },
  },
  甲状腺功能: {
    FT3: {
      name: '游离三碘甲状腺原',
      unit: 'pmol/L',
      key: 'FT3',
    },
    FT4: {
      name: '游离甲状腺素',
      unit: 'pmol/L',
      key: 'FT4',
    },
    TSH: {
      name: '促甲状腺激素',
      unit: 'UIU/ML',
      key: 'TSH',
    },
  },
  凝血功能: {
    PT: {
      name: '凝血酶原时间',
      unit: 's',
      key: 'PT',
    },
    APTT: {
      name: '活化部分凝血酶时间',
      unit: 's',
      key: 'APTT',
    },
    TT: {
      name: '凝血酶时间',
      unit: 's',
      key: 'TT',
    },
    FIB: {
      name: '纤维蛋白原浓度',
      unit: 'mg/dL',
      key: 'FIB',
    },
    INR: {
      name: '国际标准化比值',
      unit: '/',
      key: 'INR',
    },
    'D-dimer': {
      name: 'D-二聚体',
      unit: 'mg/L',
      key: 'D_dimer',
    },
  },
  心肌酶谱: {
    LDH: {
      name: '乳酸脱氢酶',
      unit: 'U/L',
      key: 'LDH',
    },
    CK: {
      name: '肌酸激酶',
      unit: 'U/L',
      key: 'CK',
    },
    'CK-MB': {
      name: '肌酸激酶同工酶',
      unit: 'U/L',
      key: 'CK_MB',
    },
    cTnI: {
      name: '心肌肌钙蛋白I',
      unit: 'U/L',
      key: 'cTnI',
    },
    cTnT: {
      name: '心肌肌钙蛋白T',
      unit: 'U/L',
      key: 'cTnT',
    },
    MYO: {
      name: '肌红蛋白',
      unit: 'U/L',
      key: 'MYO',
    },
    BNP: {
      name: '脑钠肽',
      unit: 'U/L',
      key: 'BNP',
    },
    'NT-proBNP': {
      name: '氨基末端脑钠肽前体',
      unit: 'U/L',
      key: 'NT_proBNP',
    },
  },
  细胞因子: {
    'TNF-alpha': {
      name: '肿瘤坏死因子alpha',
      unit: 'pg/ml',
      key: 'TNF_a',
    },
    'IL-1beta': {
      name: '白介素1beta',
      unit: 'pg/ml',
      key: 'IL_1b',
    },
    'IL-2R': {
      name: '白介素2受体',
      unit: 'U/L',
      key: 'IL_2R',
    },
    'IL-6': {
      name: '白介素6',
      unit: 'pg/ml',
      key: 'IL_6',
    },
    'IL-8': {
      name: '白介素8',
      unit: 'pg/ml',
      key: 'IL_8',
    },
    'IL-10': {
      name: '白介素10',
      unit: 'pg/ml',
      key: 'IL_10',
    },
  },
  淋巴细胞亚群: {
    'CD19#': {
      name: 'B淋巴细胞绝对值',
      unit: 'cells/uL',
      key: 'CD19_',
    },
    'CD3#': {
      name: 'T淋巴细胞绝对值',
      unit: 'cells/uL',
      key: 'CD3_',
    },
    'CD4#': {
      name: 'Th淋巴细胞绝对值',
      unit: 'cells/uL',
      key: 'CD4_',
    },
    'CD8#': {
      name: 'Ts淋巴细胞绝对值',
      unit: 'cells/uL',
      key: 'CD8_',
    },
    CD1656: {
      name: '自然杀伤细胞绝对值',
      unit: 'cells/uL',
      key: 'CD16_56',
    },
    'LYMPH###': {
      name: '淋巴细胞数',
      unit: 'cells/uL',
      key: 'LYMPH_',
    },
    CD19: {
      name: 'B淋巴细胞',
      unit: '%',
      key: 'CD19',
    },
    CD3: {
      name: 'T淋巴细胞',
      unit: '%',
      key: 'CD3',
    },
    CD4: {
      name: 'Th淋巴细胞',
      unit: '%',
      key: 'CD4',
    },
    CD8: {
      name: 'Ts淋巴细胞',
      unit: '%',
      key: 'CD8',
    },
    'CD4/CD8': {
      name: 'Th淋巴细胞/ Ts淋巴细胞',
      unit: '/',
      key: 'CD4CD8',
    },
    CD56: {
      name: '自然杀伤细胞',
      unit: '%',
      key: 'CD56',
    },
    'CD3CD8#': {
      name: 'CD3CD8绝对值',
      unit: 'cells/uL',
      key: 'CD3_CD8__',
    },
    CD3CD8: {
      name: 'CD3CD8',
      unit: '%',
      key: 'CD3_CD8_',
    },
    'CD3CD4#': {
      name: 'CD3CD4绝对值',
      unit: 'cells/uL',
      key: 'CD3_CD4__',
    },
    CD3CD4: {
      name: 'CD3CD4',
      unit: '%',
      key: 'CD3_CD4_',
    },
    'CD3-CD(1656)#': {
      name: 'CD3-CD(1656)绝对值',
      unit: 'cells/uL',
      key: 'CD3_CD16_56_',
    },
    'CD3-CD(1656)': {
      name: 'CD3-CD(1656)',
      unit: '%',
      key: 'CD3_CD16_56',
    },
    'CD3-CD19#': {
      name: 'CD3-CD19绝对值',
      unit: 'cells/uL',
      key: 'CD3_CD19__',
    },
    'CD3-CD19': {
      name: 'CD3-CD19',
      unit: '%',
      key: 'CD3_CD19_',
    },
    CD8CD28: {
      name: 'CD8CD28',
      unit: '%',
      key: 'CD8_CD28_',
    },
    CD20: {
      name: 'CD20',
      unit: '%',
      key: 'CD20_',
    },
    'HLA-DR': {
      name: 'HLA-DR',
      unit: '%',
      key: 'HLA_DR_',
    },
    'CD3/HLA-DR': {
      name: 'CD3/HLA-DR',
      unit: '%',
      key: 'CD3_HLA_DR1',
    },
    'CD3/HLA-DR-': {
      name: 'CD3/HLA-DR-',
      unit: '%',
      key: 'CD3_HLA_DR2',
    },
    'CD3-/HLA-DR': {
      name: 'CD3-/HLA-DR',
      unit: '%',
      key: 'CD3_HLA_DR3',
    },
    CD4CD25CD127low: {
      name: 'CD4CD25CD127low',
      unit: '%',
      key: 'CD4_CD25_CD127low',
    },
  },
  尿常规: {
    UPH: {
      name: '酸碱度',
      unit: '',
      key: 'UPH',
    },
    UGLU: {
      name: '尿糖',
      unit: '',
      key: 'UGLU',
    },
    LEU: {
      name: '尿白细胞',
      unit: '',
      key: 'LEU',
    },
    ERY: {
      name: '尿红细胞',
      unit: '',
      key: 'ERY',
    },
    NIT: {
      name: '尿亚硝酸',
      unit: '',
      key: 'NIT',
    },
    BIL: {
      name: '尿胆红素',
      unit: '',
      key: 'BIL',
    },
    USG: {
      name: '尿比重',
      unit: '',
      key: 'USG',
    },
    KET: {
      name: '尿酮体',
      unit: '',
      key: 'KET',
    },
    BLD: {
      name: '尿隐血',
      unit: '',
      key: 'BLD',
    },
    PRO: {
      name: '尿蛋白',
      unit: '',
      key: 'PRO',
    },
    UBG: {
      name: '尿胆元',
      unit: '',
      key: 'UBG',
    },
    COL: {
      name: '尿颜色',
      unit: '',
      key: 'COL',
    },
    CLA: {
      name: '尿透明度',
      unit: '',
      key: 'CLA',
    },
  },
  肿瘤标志物: {
    CEA: {
      name: '癌胚抗原',
      unit: 'NG/ML',
      key: 'CEA',
    },
    NSE: {
      name: '神经元特异烯醇化酶',
      unit: 'NG/ML',
      key: 'NSE',
    },
    'pro-GPR': {
      name: '胃泌素释放肽前体',
      unit: 'NG/ML',
      key: 'pro_GPR',
    },
    CYFRA: {
      name: 'CYFRA21-1',
      unit: 'NG/ML',
      key: 'CYFRA',
    },
    FERR: {
      name: '铁蛋白',
      unit: 'NG/ML',
      key: 'FERR',
    },
    AFP: {
      name: '甲胎蛋白',
      unit: 'NG/ML',
      key: 'AFP',
    },
    SCCA: {
      name: '鳞癌相关抗原',
      unit: 'NG/ML',
      key: 'SCCA',
    },
  },
};
const tableMap = {
  血常规: {
    name: 'BloodRoutine',
    updateFun: bloodRoutineupdate,
  },
  血生化: {
    name: 'BloodBio',
    updateFun: bloodBioupdate,
  },
  甲状腺功能: {
    name: 'Thyroid',
    updateFun: thyroidupdate,
  },
  凝血功能: {
    name: 'Coagulation',
    updateFun: coagulationupdate,
  },
  心肌酶谱: {
    name: 'MyocardialEnzyme',
    updateFun: myocardialEnzymeupdate,
  },
  细胞因子: {
    name: 'Cytokines',
    updateFun: cytokinesupdate,
  },
  淋巴细胞亚群: {
    name: 'LymSubsets',
    updateFun: lymSubsetsupdate,
  },
  尿常规: {
    name: 'UrineRoutine',
    updateFun: urineRoutineupdate,
  },
  肿瘤标志物: {
    name: 'TumorMarker',
    updateFun: tumorMarkerupdate,
  },
};
// 肺功能
const Lung = {
  'FVC(L)': {
    name: '用力肺活量',
    unit: '',
    key: 'FVC',
  },
  'FEV1/FVC(%)': {
    name: '用力呼气一秒率',
    unit: '',
    key: 'FEV1_FVC',
  },
  'MEF(L/S)': {
    name: '用力呼气中期流速',
    unit: '',
    key: 'MEF',
  },
  'MEF25(L/S)': {
    name: '25%用力呼气流速',
    unit: '',
    key: 'MEF25',
  },
  'MEF50(L/S)': {
    name: '50%用力呼气流速',
    unit: '',
    key: 'MEF50',
  },
  'MEF75(L/S)': {
    name: '75%用力呼气流速',
    unit: '',
    key: 'MEF75',
  },
  'TLC’sb(L)': {
    name: '肺总量',
    unit: '',
    key: 'TLC_sb',
  },
  'RV’(L)': {
    name: '残气容积',
    unit: '',
    key: 'RV',
  },
  'RV’/TLC’(%)': {
    name: '残气容积/肺总量比',
    unit: '',
    key: 'RV_TLC',
  },
  'VC(L)': {
    name: '肺活量',
    unit: '',
    key: 'VC',
  },
  'DLCO-ex (mL/mmHg/Mi)': {
    name: '无需屏气弥散',
    unit: '',
    key: 'DLCO_ex',
  },
  'DLCO-sb (mL/mmHg/Mi)': {
    name: '肺一氧化碳弥散量',
    unit: '',
    key: 'DLCO_sb',
  },
  KCO: {
    name: '比弥散量',
    unit: '',
    key: 'KCO',
  },
};
const exam_method_ops = [
  { value: 'CT' },
  { value: '增强CT' },
  { value: 'MRI' },
  { value: '增强MRI' },
  { value: 'X线' },
  { value: 'B超' },
  { value: '骨扫描' },
  { value: 'PET-CT' },
  { value: '其他' },
];
class LaborInspect extends React.Component {
  constructor(prop: any) {
    super(prop);
    Object.keys(labor_inspect).map(item => {
      if (this.props[tableMap[item]['name']])
        Object.keys(labor_inspect[item]).map(para => {
          this.state[`${item}_${para}`] = this.props[tableMap[item]['name']][
            `${labor_inspect[item][para]['key']}Mea`
          ];
        });
    });
    if (this.props.Lung)
      Object.keys(Lung).map(para => {
        this.state[`肺功能_${para}`] = this.props.Lung[
          `${Lung[para]['key']}Mea`
        ];
      });
    const pid = this.props.pid;
    if (this.props.OtherExams) {
      if (this.props.OtherExams.ECGDetTime)
        this.props.OtherExams.ECGDetTime = moment(
          this.props.OtherExams.ECGDetTime,
        );
      if (this.props.OtherExams.UCGDetTime)
        this.props.OtherExams.UCGDetTime = moment(
          this.props.OtherExams.UCGDetTime,
        );
    }
    if (this.props.ImageExams) {
      if (this.props.ImageExams.detectTime)
        this.props.ImageExams.detectTime = moment(
          this.props.ImageExams.detectTime,
        );
      if (typeof this.props.ImageExams.exmaMethod === 'string')
        this.props.ImageExams.exmaMethod = this.props.ImageExams.exmaMethod.split(
          ',',
        );
    }
    // console.log(this.state);
  }
  state = {
    evalution: 0,
    UCGFiles:
      this.props.OtherExams && this.props.OtherExams.UCGPath
        ? this.props.OtherExams.UCGPath.split(',')
        : [],
    ECGFiles:
      this.props.OtherExams && this.props.OtherExams.ECGPath
        ? this.props.OtherExams.ECGPath.split(',')
        : [],
    imageFiles:
      this.props.ImageExams && this.props.ImageExams.path
        ? this.props.ImageExams.path.split(',')
        : [],
  };
  render() {
    return (
      <div>
        {Object.keys(labor_inspect).map(item => {
          return (
            <div>
              <Row className={'my-table-name'}>
                <Col span={24} class>
                  <label>{item}</label>
                </Col>
              </Row>
              <Row className={'my-table-header'}>
                <Col span={3}>
                  <label>代码</label>
                </Col>
                <Col span={4}>
                  <label>项目</label>
                </Col>
                <Col span={4}>
                  <label>测定值</label>
                </Col>
                <Col span={2}>
                  <label>单位</label>
                </Col>
                <Col span={4}>
                  <label>临床意义判断</label>
                </Col>
                <Col span={4}>
                  <label>备注</label>
                </Col>
              </Row>
              <Form
                name={tableMap[item]['name']}
                initialValues={this.props[tableMap[item]['name']]}
                labelCol={{
                  span: 2,
                }}
                wrapperCol={{
                  span: 12,
                }}
                onFinish={async e => {
                  Object.keys(labor_inspect[item]).map(para => {
                    e[`${labor_inspect[item][para]['key']}Mea`] = this.state[
                      `${item}_${para}`
                    ];
                  });
                  e.pid = this.props.pid;
                  e.treNum = this.props.treNum;
                  const id_key = tableMap[item]['name']['_id'];
                  if (this.state[id_key]) e.id = this.state[id_key];
                  const res = await tableMap[item]['updateFun'](e);
                  if (res.code === 200) {
                    message.success(res.msg);
                    this.setState({ [id_key]: res.id });
                  } else message.error(res.msg);
                  console.log(this.state);
                }}
              >
                {Object.keys(labor_inspect[item]).map(para => {
                  return (
                    <div>
                      <Row>
                        <Col span={3}>
                          <label>{para}</label>
                        </Col>
                        <Col span={4}>
                          <label>{labor_inspect[item][para]['name']}</label>
                        </Col>
                        <Col span={4}>
                          <Form.Item name={labor_inspect[item][para]['key']}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={2}>
                          <label>{labor_inspect[item][para]['unit']}</label>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            name={`${labor_inspect[item][para]['key']}Mea`}
                          >
                            <Radio.Group
                              onChange={e => {
                                this.setState({
                                  [`${item}_${para}`]: e.target.value,
                                });
                              }}
                              value={this.state[`${item}_${para}`]}
                            >
                              <Radio value={'0'}>正常</Radio>
                              <Radio value={'1'}>异常</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            name={`${labor_inspect[item][para]['key']}Note`}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row style={{ margin: '0 0 15px' }}>
                        <Col offset={13}>
                          {this.state[`${item}_${para}`] &&
                          this.state[`${item}_${para}`] !== '0' ? (
                            <Radio.Group
                              value={this.state[`${item}_${para}`]}
                              onChange={e => {
                                this.setState({
                                  [`${item}_${para}`]: e.target.value,
                                });
                              }}
                            >
                              <Radio value={'1'}>1</Radio>
                              <Radio value={'2'}>2</Radio>
                              <Radio value={'3'}>3</Radio>
                              <Radio value={'4'}>4</Radio>
                              <Radio value={'5'}>5</Radio>
                            </Radio.Group>
                          ) : null}
                        </Col>
                      </Row>
                    </div>
                  );
                })}
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                </Form.Item>
              </Form>
              <hr />
            </div>
          );
        })}
        <div>
          <Row className={'my-table-name'}>
            <Col span={24}>
              <label>肺功能</label>
            </Col>
          </Row>
          <Row className={'my-table-header'}>
            <Col span={2}>
              <label>代码</label>
            </Col>
            <Col span={4}>
              <label>项目</label>
            </Col>
            <Col span={4}>
              <label>预计值</label>
            </Col>
            <Col span={3}>
              <label>最佳值</label>
            </Col>
            <Col span={3}>
              <label>最佳值/预计值(%)</label>
            </Col>
            <Col span={4}>
              <label>临床意义判断</label>
            </Col>
            <Col span={4}>
              <label>备注</label>
            </Col>
          </Row>
          <Form
            name="Lung"
            initialValues={this.props.Lung}
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: 12,
            }}
            onFinish={async e => {
              Object.keys(Lung).map(para => {
                e[`${Lung[para]['key']}Mea`] = this.state[`肺功能_${para}`];
              });
              e.pid = this.props.pid;
              e.treNum = this.props.treNum;
              const id_key = 'Lung_id';
              if (this.state[id_key]) e.id = this.state[id_key];
              const res = await lungupdate(e);
              if (res.code === 200) {
                message.success(res.msg);
                this.setState({ [id_key]: res.id });
              } else message.error(res.msg);
            }}
          >
            {Object.keys(Lung).map(para => {
              return (
                <div>
                  <Row>
                    <Col span={2}>
                      <label>{para}</label>
                    </Col>
                    <Col span={4}>
                      <label>{Lung[para]['name']}</label>
                    </Col>
                    <Col span={4}>
                      <Form.Item name={`${Lung[para]['key']}_exp`}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item name={`${Lung[para]['key']}_best`}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item name={`${Lung[para]['key']}_ratio`}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name={`${Lung[para]['key']}Mea`}>
                        <Radio.Group
                          onChange={e => {
                            this.setState({
                              [`肺功能_${para}`]: e.target.value,
                            });
                          }}
                          value={this.state[`肺功能_${para}`]}
                        >
                          <Radio value={'0'}>正常</Radio>
                          <Radio value={'1'}>异常</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name={`${Lung[para]['key']}Note`}>
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={{ margin: '0 0 15px' }}>
                    <Col offset={16}>
                      {this.state[`肺功能_${para}`] &&
                      this.state[`肺功能_${para}`] !== '0' ? (
                        <Radio.Group
                          value={this.state[`肺功能_${para}`]}
                          onChange={e => {
                            this.setState({
                              [`肺功能_${para}`]: e.target.value,
                            });
                          }}
                        >
                          <Radio value={'1'}>1</Radio>
                          <Radio value={'2'}>2</Radio>
                          <Radio value={'3'}>3</Radio>
                          <Radio value={'4'}>4</Radio>
                          <Radio value={'5'}>5</Radio>
                        </Radio.Group>
                      ) : null}
                    </Col>
                  </Row>
                </div>
              );
            })}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
          <hr />
        </div>
        <div>
          <Row className={'my-table-name'}>
            <Col span={24}>
              <label>其他检查</label>
            </Col>
          </Row>
          <Row className={'my-table-header'}>
            <Col span={4}>
              <label>项目</label>
            </Col>
            <Col span={4}>
              <label>日期</label>
            </Col>
            <Col span={8}>
              <label>结果描述</label>
            </Col>
            <Col span={8}>
              <label>操作</label>
            </Col>
          </Row>
          <Form
            name="OtherExams"
            initialValues={this.props.OtherExams}
            onFinish={async e => {
              e.ECGPath = this.state.ECGFiles.join(',');
              e.UCGPath = this.state.UCGFiles.join(',');

              if (e.ECGDetTime)
                e.ECGDetTime = e.ECGDetTime.format('YYYY-MM-DD');
              if (e.UCGDetTime)
                e.UCGDetTime = e.UCGDetTime.format('YYYY-MM-DD');
              e.pid = this.props.pid;
              e.treNum = this.props.treNum;
              const id_key = 'OtherExams_id';
              if (this.state[id_key]) e.id = this.state[id_key];
              const res = await otherExamsupdate(e);
              if (res.code === 200) {
                message.success(res.msg);
                this.setState({ [id_key]: res.id });
              } else message.error(res.msg);
            }}
            wrapperCol={{ span: 16 }}
          >
            <Row>
              <Col span={4}>
                <label>12导联心电图</label>
              </Col>
              <Col span={4}>
                <Form.Item name={'ECGDetTime'}>
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name={'ECGDesc'}>
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name={'ECGPath'} wrapperCol={{ span: 24 }}>
                  <Upload
                    name="file[]" //发到后端的文件参数名
                    action="/api/upload" //上传的地址
                    headers={{
                      authorization: 'authorization-text',
                      token: getCookie('token'),
                    }}
                    multiple={true}
                    data={{ pid: this.props.pid }}
                    defaultFileList={(
                      (this.props.OtherExams &&
                        this.props.OtherExams.ECGPath) ||
                      ''
                    )
                      .split(',')
                      .filter(x => x !== '')
                      .map(path => ({
                        uid: `ECG-${path}`,
                        name: path.split('/')[path.split('/').length - 1],
                        status: 'done',
                        url: `/file/${this.props.pid}/${
                          path.split('/')[path.split('/').length - 1]
                        }`,
                      }))}
                    onChange={info => {
                      if (info.file.status !== 'uploading') {
                        console.log(info.file, info.fileList);
                      }
                      if (info.file.status === 'done') {
                        var fileList = this.state.ECGFiles;
                        fileList = fileList.concat(info.file.response.path);
                        this.setState({ ECGFiles: fileList });
                        message.success(
                          `${info.file.name} file uploaded successfully`,
                        );
                      } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}
                    onRemove={info => {
                      var fileList = this.state.ECGFiles.filter(
                        x => x.slice(-info.name) !== info.name,
                      );
                      this.setState({ ECGFiles: fileList });
                      console.log(fileList);
                    }}
                  >
                    <Button>
                      <UploadOutlined /> 上传报告
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <label>超声心动图</label>
              </Col>
              <Col span={4}>
                <Form.Item name={'UCGDetTime'}>
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name={'UCGDesc'}>
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name={'UCGPath'} wrapperCol={{ span: 24 }}>
                  <Upload
                    name="file[]" //发到后端的文件参数名
                    action="/api/upload" //上传的地址
                    headers={{
                      authorization: 'authorization-text',
                      token: getCookie('token'),
                    }}
                    multiple={true}
                    data={{ pid: this.props.pid }}
                    defaultFileList={(
                      (this.props.OtherExams &&
                        this.props.OtherExams.UCGPath) ||
                      ''
                    )
                      .split(',')
                      .filter(x => x !== '')
                      .map(path => ({
                        uid: `UCG-${path}`,
                        name: path.split('/')[path.split('/').length - 1],
                        status: 'done',
                        url: `/file/${this.props.pid}/${
                          path.split('/')[path.split('/').length - 1]
                        }`,
                      }))}
                    onChange={info => {
                      if (info.file.status !== 'uploading') {
                        console.log(info.file, info.fileList);
                      }
                      if (info.file.status === 'done') {
                        console.log(info);
                        var fileList = this.state.UCGFiles;
                        fileList = fileList.concat(info.file.response.path);
                        this.setState({ UCGFiles: fileList });
                        message.success(
                          `${info.file.name} file uploaded successfully`,
                        );
                      } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}
                    onRemove={info => {
                      var fileList = this.state.UCGFiles.filter(
                        x => x.slice(-info.name) !== info.name,
                      );
                      this.setState({ UCGFiles: fileList });
                      console.log(fileList);
                    }}
                  >
                    <Button>
                      <UploadOutlined /> 上传报告
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
          <hr />
        </div>
        <div>
          <Row className={'my-table-name'}>
            <Col span={24}>
              <label>影像学检查</label>
            </Col>
          </Row>
          <Row className={'my-table-header'}>
            <Col span={4}>
              <label>检查部位</label>
            </Col>
            <Col span={4}>
              <label>检查方法</label>
            </Col>
            <Col span={4}>
              <label>日期</label>
            </Col>
            <Col span={4}>
              <label>肿瘤大小</label>
            </Col>
            <Col span={4}>
              <label>肿瘤描述</label>
            </Col>
            <Col span={4}>
              <label>操作</label>
            </Col>
          </Row>
          <Form
            name="ImageExams"
            initialValues={this.props.ImageExams}
            onFinish={async e => {
              e.path = this.state.imageFiles.join(',');
              if (e.detectTime)
                e.detectTime = e.detectTime.format('YYYY-MM-DD');
              if (e.exmaMethod) e.exmaMethod = e.exmaMethod.join(',');
              e.pid = this.props.pid;
              e.treNum = this.props.treNum;
              const id_key = 'ImageExams_id';
              if (this.state[id_key]) e.id = this.state[id_key];
              const res = await imageExamsupdate(e);
              if (res.code === 200) {
                message.success(res.msg);
                this.setState({ [id_key]: res.id });
              } else message.error(res.msg);
            }}
            wrapperCol={{ span: 20 }}
          >
            <Row>
              <Col span={4}>
                <Form.Item name={'examArea'}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name={'exmaMethod'}>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    options={exam_method_ops}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name={'detectTime'}>
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Row>
                  <Form.Item name={'tumorLD'} label={'长径:'}>
                    <InputNumber
                      formatter={value => `${value}cm`}
                      parser={value => value.replace('cm', '')}
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item name={'tumorSD'} label={'短径:'}>
                    <InputNumber
                      formatter={value => `${value}cm`}
                      parser={value => value.replace('cm', '')}
                    />
                  </Form.Item>
                </Row>
              </Col>
              <Col span={4}>
                <Form.Item name={'tumorDesc'}>
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name={'path'} wrapperCol={{ span: 20 }}>
                  <Upload
                    name="file[]" //发到后端的文件参数名
                    action="/api/upload" //上传的地址
                    headers={{
                      authorization: 'authorization-text',
                      token: getCookie('token'),
                    }}
                    multiple={true}
                    data={{ pid: this.props.pid }}
                    defaultFileList={(
                      (this.props.ImageExams && this.props.ImageExams.path) ||
                      ''
                    )
                      .split(',')
                      .filter(x => x !== '')
                      .map(path => ({
                        uid: `image-${path}`,
                        name: path.split('/')[path.split('/').length - 1],
                        status: 'done',
                        url: `/file/${this.props.pid}/${
                          path.split('/')[path.split('/').length - 1]
                        }`,
                      }))}
                    onChange={info => {
                      if (info.file.status !== 'uploading') {
                        console.log(info.file, info.fileList);
                      }
                      if (info.file.status === 'done') {
                        var fileList = this.state.imageFiles;
                        fileList = fileList.concat(info.file.response.path);
                        this.setState({ imageFiles: fileList });
                        message.success(
                          `${info.file.name} file uploaded successfully`,
                        );
                      } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}
                    onRemove={info => {
                      var fileList = this.state.imageFiles.filter(
                        x => x.slice(-info.name) !== info.name,
                      );
                      this.setState({ imageFiles: fileList });
                      console.log(fileList);
                    }}
                  >
                    <Button>
                      <UploadOutlined /> 上传报告
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default LaborInspect;
