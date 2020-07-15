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
import InitialDiagnosisProcess from './components/BasicComponents/InitialDiagnosisProcess';
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
                <InitialDiagnosisProcess />
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
