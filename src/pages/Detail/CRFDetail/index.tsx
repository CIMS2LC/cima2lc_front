import React from 'react';
import {
  Button,
  Layout,
  Tabs,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Radio,
  DatePicker,
} from 'antd';
import { history } from 'umi';

import styles from './style.less';
import FollowUpInfo from './components/FollowUpInfo';
import TreatmentInfo from './components/TreatmentInfo';
import LaborInspect from './components/BasicComponents/LaborInspect';
import Immunohistochemical from './components/BasicComponents/Immunohistochemical';
import MolecularDetection from './components/BasicComponents/MolecularDetection';
import PreHistory from './components/BasicComponents/PreHistory';
const { Header, Content } = Layout;
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
    //临床表现
    '颈部肿物',
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
    '无',
  ];
  clinical_manifestation_onChange = () => {};
  underlying_disease_history_Options = [
    //基础疾病史
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
    //传染疾病史
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
    '腺癌',
    '鳞癌',
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

  transfer_site_Options = [
    '肺内',
    '对侧肺',
    '胸腔镜',
    '脑',
    '脊柱',
    '四肢骨',
    '肝',
    '脾',
    '肾上腺',
    '胰腺',
    '双肺',
    '其他',
  ];
  transfer_site_onChange = () => {};
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

                  <Form.Item label="住院号/就诊号" name="adNumber">
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

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      保存
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="既往史" key="pre_history">
                <PreHistory />
              </TabPane>

              <TabPane tab="初诊过程" key="diag_procedure">
                <Form name="diag_procedure" {...layout}>
                  <Form.Item label="首诊PS评分" name="fv_score">
                    <Radio.Group
                      onChange={this.fv_score_onChange}
                      value={this.state.value}
                    >
                      {[...Array(5).keys()].map(i => (
                        <Radio value={i}>{i}</Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label="临床表现" name="clinical_manifestation">
                    <Checkbox.Group
                      options={this.clinical_manifestation_Options}
                      onChange={this.clinical_manifestation_onChange}
                    />
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
                  <Form.Item label="转移部位" name="Transfer_site">
                    <Checkbox.Group
                      options={this.transfer_site_Options}
                      onChange={this.transfer_site_onChange}
                    />
                  </Form.Item>

                  <Form.Item label="TSize" name="6">
                    <Input />
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="实验室检查" key="labor_inspect">
                <LaborInspect />
              </TabPane>
              <TabPane tab="免疫组化" key="immunohistochemical">
                <Immunohistochemical />
              </TabPane>
              <TabPane tab="分子检测" key="molecular_detection">
                <MolecularDetection />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="随访信息" key="followUp_info">
            <FollowUpInfo />
          </TabPane>
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
            <Button
              className={styles.btn_return}
              id="btn_return"
              onClick={() => {
                // handleUpdateModalVisible(true);
                // setStepFormValues(record);
                history.push('/list/fuv_list');
              }}
            >
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
