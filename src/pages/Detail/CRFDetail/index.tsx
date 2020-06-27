import React from 'react';
import {
  Menu,
  Button,
  Space,
  Layout,
  Steps,
  Tabs,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Switch,
  Radio,
  DatePicker,
  Divider,
  Rate,
} from 'antd';

import styles from './style.less';
import TreatmentInfo from './components/TreatmentInfo';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Step } = Steps;
const { TabPane } = Tabs;
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 8,
  },
};

class CRFSlidingTabs extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     mode: 'top',
  //   };
  // }
  // handleModeChange = e => {
  //   const mode = e.target.value;
  //   this.setState({ mode });
  // };
  state = {
    value: 1,
    TMB_value: false,
  };
  TMB_onChange = (checked: any) => {
    this.setState({
      TMB_value: !checked,
    });
    console.log(`switch to ${checked}`);
  };
  idNumber_onChange = (value: any) => {
    console.log('changed', value);
  };
  sex_onChange = (e: any) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  birthday_onChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  };
  fv_score_onChange = () => {};
  clinical_manifestation_Options = [
    '无',
    '体检',
    '咳嗽',
    '咳痰',
    '痰中带血',
    '咳血',
    '胸闷',
    '胸痛',
    '气促',
    '发热',
    '食欲不佳',
    '体重减轻',
    '其他',
    '不详',
  ];
  clinical_manifestation_onChange = () => {};
  underlying_disease_history_Options = [
    '无',
    '高血压',
    '冠心病',
    '糖尿病',
    '慢性阻塞性肺病',
    '支气管哮喘',
    '肺结核',
    '间质性肺病',
    '高血脂',
    '肝炎',
    '风湿性免疫性疾病',
    '肾脏病',
    '其他',
    '不详',
  ];
  underlying_disease_history_onChange = () => {};
  infectious_disease_history_Options = [
    '无',
    '肺结核',
    '艾滋',
    '梅毒',
    '其他',
    '不详',
  ];
  infectious_disease_history_onChange = () => {};
  part_Options = ['左上肺', '左下肺', '右上肺', '右中肺', '右下肺'];
  part_onChange = () => {};
  biopsy_way_Options = [
    '手术',
    '纵隔镜',
    '胸腔镜',
    '肺穿刺',
    '纤支镜',
    'EBUS',
    'EUS',
    '淋巴结活检',
    '其他',
  ];
  biopsy_way_onChange = () => {};
  pathological_diagnosis_Options = [
    '鳞癌',
    '腺癌',
    '大细胞癌',
    '小细胞癌',
    '分化差的癌',
    '类癌',
    '不典型类癌',
    '大细胞神经内分泌肿瘤',
    '复合性大细胞神经内分泌肿瘤',
    '（难以鉴别的）神经内分泌肿瘤',
    '其他',
  ];
  pathological_diagnosis_onChange = () => {};
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
  immunohistochemical_labels = [
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
    'RRM-1',
  ];
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
      <div>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab="基线资料" key="baseline_info">
            <Tabs tabPosition="top">
              <TabPane tab="基本信息" key="basic_info">
                <Form
                  name="basic_info"
                  {...layout} //className={styles.form_basic_info}
                  //initialValues={{ remember: true }}
                >
                  <Form.Item label="身份证号" name="idNumber">
                    <Input maxLength={18} />
                  </Form.Item>

                  <Form.Item label="住院号" name="adNumber">
                    <Input />
                  </Form.Item>

                  <Form.Item label="姓名" name="name">
                    <Input />
                  </Form.Item>

                  <Form.Item label="性别" name="sex">
                    <Radio.Group
                      onChange={this.sex_onChange}
                      value={this.state.value}
                    >
                      <Radio value={1}>男</Radio>
                      <Radio value={2}>女</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label="出生日期" name="birthday">
                    <DatePicker onChange={this.birthday_onChange} />
                  </Form.Item>

                  <Form.Item label="电话号码（必填）" name="phoneNumber_req">
                    <Input />
                  </Form.Item>

                  <Form.Item label="电话号码（选填）" name="phoneNumber_opt">
                    <Input />
                  </Form.Item>

                  <Form.Item label="首诊PS评分" name="fv_score">
                    <Radio.Group
                      onChange={this.fv_score_onChange}
                      value={this.state.value}
                    >
                      {[...Array(6).keys()].map(i => (
                        <Radio value={i}>{i}</Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      保存
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="既往史" key="pre_history">
                <Form name="pre_history" {...layout}>
                  <Form.Item label="临床表现" name="clinical_manifestation">
                    <Checkbox.Group
                      options={this.clinical_manifestation_Options}
                      onChange={this.clinical_manifestation_onChange}
                    />
                  </Form.Item>

                  <Form.Item
                    label="基础疾病史"
                    name="underlying_disease_history"
                  >
                    <Checkbox.Group
                      options={this.underlying_disease_history_Options}
                      onChange={this.underlying_disease_history_onChange}
                    />
                  </Form.Item>

                  <Form.Item
                    label="传染疾病史"
                    name="infectious_disease_history"
                  >
                    <Checkbox.Group
                      options={this.infectious_disease_history_Options}
                      onChange={this.infectious_disease_history_onChange}
                    />
                  </Form.Item>

                  <Form.Item label="肿瘤史" name="tumor_history">
                    <Radio.Group>
                      <Radio value={1}>有</Radio>
                      <Radio value={0}>无</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label="肿瘤家族史" name="tumor_family_history">
                    <Radio.Group>
                      <Radio value={1}>有</Radio>
                      <Radio value={0}>无</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label="是否吸烟" name="smoking">
                    <Radio.Group>
                      <Radio value={1}>有</Radio>
                      <Radio value={0}>无</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      保存
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="初诊过程" key="diag_procedure">
                <Form name="diag_procedure" {...layout}>
                  <Form.Item label="CEA（ng/mL）" name="cea">
                    <InputNumber></InputNumber>
                    <Checkbox>无检测</Checkbox>
                  </Form.Item>

                  <Form.Item label="NSE（μg/L）" name="nes">
                    <InputNumber></InputNumber>
                    <Checkbox>无检测</Checkbox>
                  </Form.Item>

                  <Form.Item label="影像学" name="iconography">
                    <Radio.Group>
                      <Radio value={0}>周围型</Radio>
                      <Radio value={1}>中央型</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label="部位" name="part">
                    <Checkbox.Group
                      options={this.part_Options}
                      onChange={this.part_onChange}
                    />
                  </Form.Item>

                  <Form.Item label="活检方式" name="biopsy_way">
                    <Checkbox.Group
                      options={this.biopsy_way_Options}
                      onChange={this.biopsy_way_onChange}
                    />
                  </Form.Item>

                  <Form.Item label="是否胸膜侵犯" name="pleural_invasion">
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label="标本部位" name="biopsy_way">
                    <Input />
                  </Form.Item>
                  <Form.Item label="初诊日期" name="biopsy_way">
                    <Input />
                  </Form.Item>
                  <Form.Item label="病理报告日期" name="biopsy_way">
                    <Input />
                  </Form.Item>
                  <Form.Item label="病理号" name="biopsy_way">
                    <Input />
                  </Form.Item>
                  <Form.Item label="病理诊断" name="pathological_diagnosis">
                    <Checkbox.Group
                      options={this.pathological_diagnosis_Options}
                      onChange={this.pathological_diagnosis_onChange}
                    />
                  </Form.Item>
                  <Form.Item
                    label="核分裂像/2mm2=个人显微镜8.3个40倍高倍视野"
                    name="1"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="复合性癌(记录非小细胞癌的类型)" name="2">
                    <Input />
                  </Form.Item>
                  <Form.Item label="坏死面积（占肿瘤面积的百分比）" name="3">
                    <Input />
                  </Form.Item>
                  <Form.Item label="肿块大小(mm)" name="4">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Ki67（%）" name="5">
                    <Input />
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="实验室检查" key="labor_inspect">
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
                </Form>
              </TabPane>
              <TabPane tab="免疫组化" key="immunohistochemical">
                <Form name="immunohistochemical" {...layout}>
                  {this.immunohistochemical_labels.map(item => (
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
                </Form>
              </TabPane>
              <TabPane tab="分子检测" key="molecular_detection">
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
                </Form>
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="随访信息" key="followUp_info"></TabPane>
          <TabPane tab="治疗信息" key="treatment_info">
            <TreatmentInfo />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default () => {
  return (
    <>
      <Layout>
        <Header
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            background: 1677215,
          }}
        >
          <div>
            <img className={styles.img_logo} src={require('@/img/logo.png')} />
            <Button className={styles.btn_return} id="btn_return">
              返回
            </Button>
          </div>
        </Header>
        <Content
          style={{
            padding: '0 50px',
            marginTop: 64,
          }}
        >
          <div>
            <CRFSlidingTabs />
          </div>
        </Content>
      </Layout>
    </>
  );
};
